class Contract {
  static async fetchContractBalanceInWei(contractAddress) {
    return await new Promise((resolve) => {
      web3.eth.getBalance(contractAddress, function(error, { c: [ balance ]} ){
        resolve(balance);
      });
    })
  }

  static toEthFromWei(wei) {
    return web3.fromWei(wei);
  }

  static async loadTickets() {
    return await new Promise((resolve) => {
      contract.ticketsAvailable(async (error, { c: [ticketCount] }) => {
        let addressRequests = [];
        for (var ticket = 0; ticket < ticketCount; ticket++) {
          addressRequests.push(this.loadTicketOwner(ticket));
        }
        resolve(await Promise.all(addressRequests));
      });
    });
  }

  static loadTicketOwner(ticket) {
    return new Promise((resolve) => {
      contract.owner(ticket, (error, address) => {
        resolve(address, ticket);
      });
    });
  }
}
