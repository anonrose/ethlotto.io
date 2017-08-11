pragma solidity ^0.4.11;

contract Lottery {

  address public admin;

  uint public lotteryStart;
  uint public lotteryTime;
  uint public ticketPrice;
  uint public ticketsAvailable;

  // mapping of ticket index to owner address
  mapping(uint => address) public owner;


  event LotteryCreated(uint lotteryStart, uint lotteryTime);
  event LotteryDeleted();

  event LotteryCompleted(address winner, uint winnings);

  modifier onlyAdmin { require(msg.sender == admin); _; }

  function Lottery() {
    //admin for distribution services and lottery creation/deletion
    admin = msg.sender;
  }

  function newLottery(uint _ticketsAvailable, uint _lotteryTime, uint _ticketPrice) onlyAdmin {

    require(now >= (lotteryStart + lotteryTime)); // the previous lottery must have ended

    // if there was a previous lottery reset the tickets that were available
    deleteLottery();

    ticketsAvailable = _ticketsAvailable;
    lotteryTime      = _lotteryTime;
    ticketPrice      = _ticketPrice;

    lotteryStart     = now;

    LotteryCreated(lotteryStart, lotteryTime);
  }

  function deleteLottery() onlyAdmin {

    for (uint ticket = 0; ticket < ticketsAvailable; ticket++) {
      owner[ticket] = address(0);
    }

    ticketsAvailable = 0;
    lotteryStart     = 0;
    lotteryTime      = 0;
    ticketPrice      = 0;

    LotteryDeleted();
  }

  function purchaseTicket(uint ticket) payable {
    var purchaser = msg.sender;

    require(now <= (lotteryStart + lotteryTime)); // lottery isn't over
    require(owner[ticket] == address(0));         // the ticket hasn't been purchased
    require(msg.value == ticketPrice);            // value sent is the ticket price

    owner[ticket] = purchaser;
  }

  function completeLottery(uint winningHash) payable onlyAdmin {

    var winner = owner[winningHash % ticketsAvailable];

    if (winner != address(0)) {
      // TODO : decide what to do here, many options
    }

    LotteryCompleted(winner, this.balance);

    winner.transfer(this.balance);
    deleteLottery();
  }
}
