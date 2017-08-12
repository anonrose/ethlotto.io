require('babel-polyfill');

var Lottery = artifacts.require('Lottery');

const ticketsAvailable = 300;
const lotteryTime      = 500;
const ticketPrice      = 500; // everythins is represented in wei - https://goo.gl/V4hsdY

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

    await lotto.newLottery(ticketsAvailable, lotteryTime, ticketPrice);

    let _ticketsAvailable = await lotto.ticketsAvailable();
    let _lotteryTime      = await lotto.lotteryTime();
    let _ticketPrice      = await lotto.ticketPrice();

    assert.equal(_ticketsAvailable, ticketsAvailable, 'correct number of tickets vailable');
    assert.equal(_lotteryTime, lotteryTime, 'correct lottery time');
    assert.equal(_ticketPrice, ticketPrice, 'correct ticket price is set');
  });


  it('deleting a lottery resets attributes', async function() {
    let lotto = await Lottery.deployed();
    await lotto.deleteLottery();

    let _ticketsAvailable = await lotto.ticketsAvailable();
    let _lotteryTime      = await lotto.lotteryTime();
    let _ticketPrice      = await lotto.ticketPrice();

    assert.equal(_ticketsAvailable, 0, 'correct number of tickets vailable');
    assert.equal(_lotteryTime, 0, 'correct lottery time');
    assert.equal(_ticketPrice, 0, 'correct ticket price is set');
  });

});
