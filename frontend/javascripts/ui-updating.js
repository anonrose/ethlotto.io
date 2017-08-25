class UIUpdater {

  static updatePriceEveryInterval(selector, interval, runImmediatly) {
    if (runImmediatly) {
      this.updatePrice(selector);
    }
    setInterval(()=> {
      this.updatePrice(selector);
    }, interval);
  }

  static async updatePrice(selector) {
    let balanceInEth = await Contract.fetchContractBalanceInWei(CONTRACT_ADDRESS);
    let currentEthAttrs = await (await fetch('/api/price.json')).json();
    $(selector).text(Math.ceil(Contract.toEthFromWei(parseFloat(balanceInEth) * currentEthAttrs.Price.usd))/100);
  }
}


$(_ => {
  UIUpdater.updatePriceEveryInterval('.shimmer', 10000, true);
});
