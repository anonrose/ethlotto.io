class TicketSelection {
  constructor(min, max, ticketsPerPage) {
    
    Object.assign(this, {min, max, ticketsPerPage});

    this.addTicketsToDOM(Math.floor(max/2));
    this.createSlider(min, max);
    this.addClickEvents();
  }

  addTicketsToDOM(startPosition='random') {

    var newTickets = [...(new Array(this.ticketsPerPage))];

    newTickets = (startPosition == 'random' ? newTickets.map(_ => Math.floor(Math.random() * (this.max - this.min)) + this.min ) : 
                                              newTickets.map((_, i) => startPosition + i));

    newTickets = newTickets.filter( i => i <= this.max && i >= this.min);

    $('.chips-column').html('');

    for (var ticket of newTickets) {
      let ticketMarkup = this.buildTicketMarkup(ticket);
      $('.chips-column').append($(ticketMarkup));
    }

    this.showTickets(newTickets);
  }

  buildTicketMarkup(ticket) {
    let r = Math.floor(Math.random() * 1000);
    return `<div class='chip-container index-${ticket} initial-rotation' data-value='${r}'>
              <div class="chip front ${r < 500 ? 'green' : 'grey'} lighten-1">
              <i class="fa fa-ticket" aria-hidden="true"></i>
               ${ticket}
              </div>
            </div>`;
  }

  async showTickets(range) {
    for (var ticket of range) {
      await new Promise((resolve) => {
        setTimeout(()=>{
          $(`.chip-container.index-${ticket}`).removeClass('initial-rotation');
          resolve();
        }, 30);
      });
    }
    await new Promise((resolve) => {
        setTimeout(()=>{
          for (var ticket of range) {
            ticket = $(`.chip-container.index-${ticket}`);
            let value = ticket.data('value');
            ticket.addClass(`${value < 500 ? 'for-sale' : 'sold'}`);
          }
          resolve();
        }, 500);
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

$(_ => {
  let start = 0, end = 1000, ticketsPerPage = 50;
  new TicketSelection(start, end, ticketsPerPage);
});
