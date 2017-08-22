const CONTRACT_ADDRESS = '0x042c0bd56b3c377363ab1603672e7f07445f184d';
const CONTRACT_ABI = [{"constant":true,"inputs":[],"name":"ticketPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ticketsAvailable","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_ticketsAvailable","type":"uint256"},{"name":"_lotteryTime","type":"uint256"},{"name":"_ticketPrice","type":"uint128"}],"name":"newLottery","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"winningHash","type":"uint256"}],"name":"completeLottery","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"lotteryTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ticket","type":"uint256"}],"name":"getTicketOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ticket","type":"uint256"}],"name":"purchaseTicket","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"lotteryStart","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"lotteryStart","type":"uint256"},{"indexed":false,"name":"lotteryTime","type":"uint256"}],"name":"LotteryCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"winner","type":"address"},{"indexed":false,"name":"winnings","type":"uint256"}],"name":"LotteryCompleted","type":"event"}];


class EtherLottery {
  constructor(contract) {
    Object.assign(this, {contract});
    this.loadTickets(contract);
  }

  async loadTickets(contract) {
    contract.ticketsAvailable(async (error, { c: [ticketCount] }) => {
      let addressRequests = [];
      for (var ticket = 0; ticket <= ticketCount; ticket++) {
        addressRequests.push(this.loadTicketOwner(contract, ticket));
      }

      this.addresses = await Promise.all(addressRequests);
    });
  }

  loadTicketOwner(contract, ticket) {
    return new Promise((resolve) => {
      contract.owner(ticket, (error, address) => {
        resolve(address, ticket);
      });
    });
  }
}



$(_ =>{
  if(typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
  } else if (typeof Web3 !== 'undefined') {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  web3.eth.getCode(CONTRACT_ADDRESS, (e, r) => {
    if (!e && r.length > 3)
      var contract = web3.eth.contract(CONTRACT_ABI).at(CONTRACT_ADDRESS);
      let ethLotto =  new EtherLottery(contract);
  });

});
