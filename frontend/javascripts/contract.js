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
}
