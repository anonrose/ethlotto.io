pragma solidity ^0.4.11;

contract Lottery {

  address public admin;
  address public lotteryPool;

  uint public lotteryStart;
  uint public lotteryTime;
  uint public ticketPrice;

  // mapping of ticket index to owner address
  mapping(uint => address) public owner;


  event LotteryCreated(uint lotteryStart, uint lotteryTime);
  event LotteryDeleted();

  Lottery(address _lotteryPool) {
    //admin for distribution services and lottery creation/deletion
    admin = msg.sender;
    lotteryPool = _lotteryPool;
  }

  newLottery(uint _ticketsAvailable, uint _lotteryTime, uint _ticketPrice, address _lotteryPool) {

    require(msg.sender == admin); // only the admin can create a new Lottery
    require(now >= (lotteryStart + lotteryTime)); // the previous lottery must have ended

    // if there was a previous lottery reset the tickets that were available
    deleteLottery();

    ticketsAvailable = _ticketsAvailable;
    lotteryTime      = _lotteryTime;
    ticketPrice      = _ticketPrice;
    lotteryPool      = _lotteryPool;

    lotteryStart     = now;

    LotteryCreated(lotteryStart, lotteryTime);
  }

  deleteLottery() {
    require(msg.sender == admin); // only the admin can delete a Lottery

    for (uint ticket = 0; ticket < ticketsAvailable; i++) {
      owner[ticket] = address(0);
    }

    ticketsAvailable = 0;
    lotteryStart     = 0;
    lotteryTime      = 0;
    ticketPrice      = 0;
    lotteryPool      = address(0);

    LotteryDeleted();
  }

  purchaseTicket(ticket) payable {
    var purchaser = msg.sender;

    require(now <= (lotteryStart + lotteryTime)); // lottery isn't over
    require(owner[ticket] == address(0));  // the ticket hasn't been purchased
    require(msg.value == ticketPrice);     // value sent is the ticket price

    owner[ticket] = purchaser;
  }
}
