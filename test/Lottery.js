require('babel-polyfill');

var Lottery = artifacts.require('Lottery');

const ticketsAvailable = 300;
const lotteryTime      = 500;
const ticketPrice      = 500; // everything is represented in wei - https://goo.gl/V4hsdY
const address0         = '0x0000000000000000000000000000000000000000';

contract('Lottery', function([admin, ...addresses]) {

  it('should deploy', async function() {
    let lotto = await Lottery.deployed();
    assert.ok(1);
  });

  it('has correct admin', async function() {
    let lotto  = await Lottery.deployed();
    let _admin = await lotto.admin();

    assert.equal(admin, _admin, 'correct admin is set');
  });

  it('new lottery creates correct lottery', async function() {
    let lotto = await Lottery.deployed();

    let lottoCreatedEvent = lotto.LotteryCreated();

    lottoCreatedEvent.watch((error, results)=>{
      if (results.args.length) {
        let _lotteryTime = results.args[0].lotteryTime;
        assert.equal(lotteryTime, _lotteryTime, 'LotteryCreated event is fired with correct arguments');
      }
    });

    await lotto.newLottery(ticketsAvailable, lotteryTime, ticketPrice);

    let _ticketsAvailable = await lotto.ticketsAvailable();
    let _lotteryTime      = await lotto.lotteryTime();
    let _ticketPrice      = await lotto.ticketPrice();

    assert.equal(_ticketsAvailable, ticketsAvailable, 'correct number of tickets vailable');
    assert.equal(_lotteryTime, lotteryTime, 'correct lottery time');
    assert.equal(_ticketPrice, ticketPrice, 'correct ticket price is set');
  });

  it('has correct owners', async function() {
    let lotto = await Lottery.deployed();
    let ticket = 1;

    let ownerOf1 = await lotto.getTicketOwner.call(ticket);

    assert.equal(ownerOf1, address0, 'the ticket 1 has no owner');
  });
});
