CONTRACT_ADDRESS = '0x042c0bd56b3c377363ab1603672e7f07445f184d';
CONTRACT_ABI = [{"constant":true,"inputs":[],"name":"ticketPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ticketsAvailable","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_ticketsAvailable","type":"uint256"},{"name":"_lotteryTime","type":"uint256"},{"name":"_ticketPrice","type":"uint128"}],"name":"newLottery","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"winningHash","type":"uint256"}],"name":"completeLottery","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"lotteryTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ticket","type":"uint256"}],"name":"getTicketOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ticket","type":"uint256"}],"name":"purchaseTicket","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"lotteryStart","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"lotteryStart","type":"uint256"},{"indexed":false,"name":"lotteryTime","type":"uint256"}],"name":"LotteryCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"winner","type":"address"},{"indexed":false,"name":"winnings","type":"uint256"}],"name":"LotteryCompleted","type":"event"}];
ADDRESS_0 = '0x0000000000000000000000000000000000000000';



class TicketSelection {
  constructor(min, max, ticketsPerPage, tickets, ticketPrice) {

    Object.assign(this, {min, max, ticketsPerPage, tickets, ticketPrice});

    this.addTicketsToDOM(Math.floor(max/2));
    this.createSlider(min, max);
    this.addClickEvents();
  }

  addTicketsToDOM(startPosition='random') {

    var ticketToOwner = {};

    if (startPosition == 'random') { // assign

      for (var i = 0; i < this.ticketsPerPage; i++) {
        let randomNumberInRange = Math.floor(Math.random() * (this.max - this.min)) + this.min;
        ticketToOwner[randomNumberInRange] =  this.tickets[randomNumberInRange];
      }

    } else {

      for (var i = startPosition, total = 0; i <= this.max && total <  this.ticketsPerPage;) {
        ticketToOwner[i] = this.tickets[i];
        i++; total++;
      }

    }


    $('.chips-column').html('');

    for (var ticket in ticketToOwner) {
      let ticketMarkup = this.buildTicketMarkup(ticket, ticketToOwner[ticket]);
      $('.chips-column').append($(ticketMarkup));
    }

    this.showTickets(ticketToOwner);
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
    for (var ticket in tickets) {
      await new Promise((resolve) => {
        setTimeout(()=>{
          $(`.chip-container.index-${ticket}`).removeClass('initial-rotation');
          resolve();
        }, 30);
      });
    }

    await new Promise((resolve) => {
        setTimeout(()=>{
          for (var ticket in tickets) {
            ticket = $(`.chip-container.index-${ticket}`);
            let owner = ticket.data('owner');
            ticket.addClass(`${owner == ADDRESS_0 ? 'for-sale' : 'sold'}`);
          }
          resolve();
        }, 600);
    });
  }

  addClickEvents() {
    $('.arrow.random').click( _ => this.addTicketsToDOM() );
    this.slider.noUiSlider.on('change', (values, handle) => {
  	  this.addTicketsToDOM(parseInt(values[handle]));
    });
  }

  createSlider(min, max) {
    this.slider = document.getElementById('test-slider');
    noUiSlider.create(this.slider, {
      start: [max/2], behaviour: 'drag', step: 5,
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
    let tickets = await this.loadTickets();

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
          ;({ c: [ response ] } = response);
        }

        attrToValue[attr] = response;

        resolve(attrToValue);
      });
    });
  }

  async loadTickets() {
    let contract = this.contract;
    return await new Promise((resolve) => {
      contract.ticketsAvailable(async (error, { c: [ticketCount] }) => {
        let addressRequests = [];
        for (var ticket = 0; ticket <= ticketCount; ticket++) {
          addressRequests.push(this.loadTicketOwner(contract, ticket));
        }
        resolve(await Promise.all(addressRequests));
      });
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


$(_ => {

  if(typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
  } else {
      web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/unUocZxzv4r4nTIdNwBP "));
      promptForMetaMask();
  }

  web3.eth.getCode(CONTRACT_ADDRESS, (e, r) => {
    if (!e && r.length > 3) {
      contract = web3.eth.contract(CONTRACT_ABI).at(CONTRACT_ADDRESS);

      let ethLotto =  new EtherLottery(contract);

      let contractAttributes = ['admin', 'lotteryStart', 'lotteryTime', 'ticketPrice', 'ticketsAvailable'];

      ethLotto.loadAttributes(contractAttributes).then(({admin, lotteryStart, lotteryTime, ticketPrice, tickets, ticketsAvailable}) => {
        new TicketSelection(0, ticketsAvailable, 30, tickets, ticketPrice);

        $('.chip-container').click((e)=>{
          $ct = $(e.currentTarget);
          contract.purchaseTicket(Number($ct.data('ticket')), {from: web3.eth.accounts[0], value: 5000, gas: 400000}, function(){console.log(...arguments)});
        });

      });
    }
  });
});
