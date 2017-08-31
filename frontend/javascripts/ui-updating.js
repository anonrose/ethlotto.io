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
    $(selector).text(`$${Math.ceil(Contract.toEthFromWei(parseFloat(balanceInEth) * currentEthAttrs.Price.usd))/100}`);
  }

  static updateTicketStatusEveryInterval(interval) {
    setInterval(()=> {
      Contract.loadTickets().then(tickets => this.updateTickets(tickets));
    }, interval);
  }

  static updateTickets(tickets) {

    ticketSelection.tickets = tickets;

    $('.for-sale').each((_, e)=>{
      let $e = $(e);
      let ticketNumber = $e.data('ticket');

      if (tickets[ticketNumber] !== ADDRESS_0) {
        notification(`Ticket ${ticketNumber} was sold!`);
        $e.replaceWith(`<div class='chip-container sold index-${ticketNumber} initial-rotation' data-ticket='${ticketNumber}' data-owner='${tickets[ticketNumber]}'>
                          <div class="chip front grey lighten-1">
                          <i class="fa fa-ticket" aria-hidden="true"></i>
                           ${ticketNumber}
                          </div>
                        </div>`);

          setTimeout(()=>{
            $(`.chip-container.index-${ticketNumber}`).removeClass('initial-rotation');
            resolve();
          }, 30);
      }
    })
  }
}


$(_ => {
  UIUpdater.updatePriceEveryInterval('.shimmer', 10000, true);
  UIUpdater.updateTicketStatusEveryInterval(3000);
});
