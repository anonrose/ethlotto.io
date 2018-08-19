class TicketSelection {
  constructor(min, max, ticketsPerPage, tickets, ticketPrice) {

    Object.assign(this, { min, max, ticketsPerPage, tickets, ticketPrice });

    this.addTicketsToDOMAndShowTickets(Math.floor(max / 2));
    this.createSlider(min, max);
    this.addTicketSearchingClickEvents();
  }

  addTicketsToDOMAndShowTickets(startPosition = 'random') {
    let ticketsToOwner = this.getTicketsToOwner(startPosition);
    this.appendTicketsToDOM(ticketsToOwner);

    this.showTickets(ticketsToOwner).then(() => {
      this.addTicketClickEvent();
    });
  }

  getTicketsToOwner(startPosition) {
    return startPosition == 'random' ? this.getRandomTickets() : this.getOrderedTickets(startPosition);
  }

  getRandomTickets() {
    var ticketsToOwner = {};

    for (var i = 0; i < this.ticketsPerPage; i++) {
      let randomNumberInRange = Math.floor(Math.random() * (this.max - this.min)) + this.min;
      ticketsToOwner[randomNumberInRange] = this.tickets[randomNumberInRange];
    }

    return ticketsToOwner;
  }

  getOrderedTickets(startPosition) {
    var ticketsToOwner = {};

    for (var i = startPosition, total = 0; i <= this.max && total < this.ticketsPerPage;) {
      ticketsToOwner[i] = this.tickets[i];
      i++; total++;
    }

    return ticketsToOwner;
  }

  appendTicketsToDOM(ticketsToOwner) {
    $('.chips-column').html('');

    for (var ticket in ticketsToOwner) {
      let ticketMarkup = this.buildTicketMarkup(ticket, ticketsToOwner[ticket]);
      $('.chips-column').append($(ticketMarkup));
    }

  }

  addTicketClickEvent() {
    $('.chip-container').click((e) => {
      if (web3.currentProvider.host != INFURA_HOST) {
        var $ct = $(e.currentTarget), ticket = Number($ct.data('ticket'));
        this.purchaseTicket(ticket);
      } else {
        notification("Install Meta Mask to Purchase a Ticket", "Meta Mask", "https://metamask.io/");
      }
    });
  }

  purchaseTicket(ticket) {
    contract.purchaseTicket(ticket, { from: web3.eth.accounts[0], value: this.ticketPrice, gas: 60000 }, (e, txhash) => {
      notification(`Purchasing Ticket ${ticket}`, "View Transaction", `https://etherscan.io/tx/${txhash}`, 5000);
    });
  }

  buildTicketMarkup(ticket, owner) {
    return `<div class='chip-container index-${ticket} initial-rotation' data-ticket='${ticket}' data-owner='${owner}'>
              <div class="chip front ${owner == ADDRESS_0 ? 'green' : 'grey'} lighten-1">
              <i class="fa fa-ticket" aria-hidden="true"></i>
               ${ticket}
              </div>
            </div>`;
  }

  async showTickets(tickets) {
    await this.initialRotation(tickets);

    await this.addTicketStatus(tickets);
  }

  async initialRotation(tickets) {
    for (var ticket in tickets) {
      await new Promise((resolve) => {
        setTimeout(() => {
          $(`.chip-container.index-${ticket}`).removeClass('initial-rotation');
          resolve();
        }, 30);
      });
    }
  }

  addTicketStatus(tickets) {
    return new Promise((resolve) => {
      setTimeout(() => {
        for (var ticket in tickets) {
          ticket = $(`.chip-container.index-${ticket}`);
          let owner = ticket.data('owner');
          ticket.addClass(`${owner == ADDRESS_0 ? 'for-sale' : 'sold'}`);
        }
        resolve();
      }, 600);
    });
  }

  addTicketSearchingClickEvents() {
    $('.arrow.random').click(_ => this.addTicketsToDOMAndShowTickets());

    this.slider.noUiSlider.on('change', (values, handle) => {
      this.addTicketsToDOMAndShowTickets(parseInt(values[handle]));
    });
  }

  createSlider(min, max) {
    this.slider = document.getElementById('test-slider');
    noUiSlider.create(this.slider, {
      start: [max / 2], behaviour: 'drag', step: 5,
      orientation: 'horizontal',
      range: { min, max },
      format: wNumb({ decimals: 0 })
    });
  }
}


class EtherLottery {
  constructor(contract) {
    Object.assign(this, { contract });
  }

  async loadAttributes(attributesToLoad) {
    let contractAttributes = {};
    let tickets = await Contract.loadTickets();

    Object.assign(contractAttributes, { tickets });

    for (var attr of attributesToLoad) {
      let attrToValue = await this.getAttributeValueFromContract(attr);
      Object.assign(contractAttributes, attrToValue);
    }

    return contractAttributes;
  }

  getAttributeValueFromContract(attr) {
    return new Promise((resolve) => {
      this.contract[attr]((error, response) => {
        var attrToValue = {};

        if (typeof response == 'object') { // need to do some deconstruction if the response is an object
          ; ({ c: [response] } = response);
        }

        attrToValue[attr] = response;

        resolve(attrToValue);
      });
    });
  }
}

$(_ => {

  if (typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider(INFURA_HOST));
    notification("Install Meta Mask to Purchase a Ticket", "Meta Mask", "https://metamask.io/");
  }

  web3.eth.getCode(CONTRACT_ADDRESS, (e, r) => {
    if (!e && r.length > 3) {
      contract = web3.eth.contract(CONTRACT_ABI).at(CONTRACT_ADDRESS);

      let ethLotto = new EtherLottery(contract);

      let contractAttributes = ['admin', 'lotteryStart', 'lotteryTime', 'ticketPrice', 'ticketsAvailable'];

      ethLotto.loadAttributes(contractAttributes).then(({ admin, lotteryStart, lotteryTime, ticketPrice, tickets, ticketsAvailable }) => {
        ticketSelection = new TicketSelection(0, ticketsAvailable - 1, 22, tickets, ticketPrice);
      });
    }
  });
});
