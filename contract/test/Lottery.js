const EXPECT_FAILURE = require('./ExpectFailure');

var Lottery = artifacts.require('Lottery');

const ticketsAvailable = 100
const ticketPrice = 10000000000000000 // everything is represented in wei - https://goo.gl/V4hsdY
const address0 = '0x0000000000000000000000000000000000000000'

contract('Lottery', function ([_, user1]) {

  it('should deploy', async function () {
    await Lottery.deployed();
    assert.ok(1);
  });

  it('new lottery creates correct lottery', async function () {
    let lotto = await Lottery.deployed()

    await lotto.newLottery()

    let _ticketsAvailable = await lotto.ticketsAvailable()
    let _ticketPrice = await lotto.ticketPrice()

    assert.equal(_ticketsAvailable.toNumber(), ticketsAvailable, 'correct number of tickets vailable')
    assert.equal(_ticketPrice.toNumber(), ticketPrice, 'correct ticket price is set')
  });

  it('has correct owners', async function () {
    let lotto = await Lottery.deployed()
    let ticket = 1

    let ownerOf1 = await lotto.getTicketOwner.call(ticket)

    assert.equal(ownerOf1, address0, 'the ticket 1 has no owner')
  });

  it('purchases tickets correctly', async function () {
    let lotto = await Lottery.deployed()
    let ticket = 1

    await lotto.purchaseTicket(ticket, { from: user1, value: ticketPrice })

    let ownerOf1 = await lotto.getTicketOwner.call(ticket)

    let lotteryBalance = web3.eth.getBalance(lotto.address).toNumber()

    assert.equal(user1, ownerOf1, 'user1 is now the owner of ticket 1')
    assert.equal(lotteryBalance, ticketPrice, 'lottery has correct balance after purchasing a ticket')
  });

  it('can not purchase ticket with too few of funds', async function () {
    let lotto = await Lottery.deployed();
    let ticket = 1;

    await EXPECT_FAILURE.EXPECT_THROW(lotto.purchaseTicket(ticket, { from: user1, value: 499 }));
  });

  it('can not purchase ticket that has already been puchased', async function () {
    let lotto = await Lottery.deployed();
    let ticket = 1;

    await EXPECT_FAILURE.EXPECT_THROW(lotto.purchaseTicket(ticket, { from: user1, value: ticketPrice }));
  });
});
