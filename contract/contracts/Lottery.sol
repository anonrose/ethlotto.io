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
  event LotteryCompleted(address winner, uint winnings);

  modifier onlyAdmin { require(msg.sender == admin); _; }

  function Lottery() {
    //admin for distribution services and lottery creation/deletion
    admin = msg.sender;
  }

  function newLottery(uint _ticketsAvailable, uint _lotteryTime, uint128 _ticketPrice) onlyAdmin {

    for (uint ticket = 0; ticket < ticketsAvailable; ticket++) {
      owner[ticket] = address(0);
    }

    ticketsAvailable = _ticketsAvailable;
    lotteryTime      = _lotteryTime;
    ticketPrice      = _ticketPrice;
    lotteryStart     = now;

    LotteryCreated(lotteryStart, lotteryTime);
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

    if (winner == address(0)) { /* TODO: I don't know what to do here so this is just temp */
      admin.transfer(this.balance);
    }

    LotteryCompleted(winner, this.balance);

    winner.transfer(this.balance);
  }

  function getTicketOwner(uint ticket) returns(address) {
    return owner[ticket];
  }
}
