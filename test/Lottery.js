require('babel-polyfill');

const EXPECT_FAILURE = require('./ExpectFailure');

var Lottery = artifacts.require('Lottery');

const ticketsAvailable = 300;
const lotteryTime      = 500;
const ticketPrice      = 500; // everything is represented in wei - https://goo.gl/V4hsdY
const address0         = '0x0000000000000000000000000000000000000000';

contract('Lottery', function([admin, user1, user2, ...addresses]) {

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

  it('has correct owners', async function() {
    let lotto = await Lottery.deployed();
    let ticket = 1;

    let ownerOf1 = await lotto.getTicketOwner.call(ticket);

    assert.equal(ownerOf1, address0, 'the ticket 1 has no owner');
  });

  it('purchases tickets correctly', async function() {
    let lotto = await Lottery.deployed();
    let ticket = 1;

    await lotto.purchaseTicket(ticket, {from: user1, value: 500});
    let ownerOf1 = await lotto.getTicketOwner.call(ticket);
    let lotteryBalance = web3.eth.getBalance(lotto.address).toNumber();

    assert.equal(user1, ownerOf1, 'user1 is now the owner of ticket 1');
    assert.equal(lotteryBalance, 500, 'lottery has correct balance after purchasing a ticket');
  });

  it('can not purchase ticket with too few of funds', async function() {
    let lotto = await Lottery.deployed();
    let ticket = 1;

    await EXPECT_FAILURE.EXPECT_THROW(lotto.purchaseTicket(ticket, {from: user1, value: 499}));
  });

  it('only allows admin to create a lottery and finish a lottery', async function() {
    let lotto = await Lottery.deployed();
    let ticket = 1;

    await EXPECT_FAILURE.EXPECT_THROW(lotto.newLottery(ticketsAvailable, lotteryTime, ticketPrice, {from: user1, value: 499}));
    await EXPECT_FAILURE.EXPECT_THROW(lotto.completeLottery('1234198238491', {from: user1, value: 499}));
  });

  it('transfers money upon someone winning the lottery ayoo', async function() {
    let lotto = await Lottery.deployed();
    let ticket = 0;
    let _ticketsAvailable = 2;

    lotto.newLottery(_ticketsAvailable, lotteryTime, ticketPrice);

    await lotto.purchaseTicket(ticket += 1, {from: user1, value: 500});
    await lotto.purchaseTicket(ticket += 1, {from: user2, value: 500});

    let randomWeiner = Math.floor(Math.random() * 3);
    let hash = "2394570293475" + randomWeiner;

    let lotteryBalance = web3.eth.getBalance(lotto.address).toNumber();
    assert.equal(lotteryBalance, 1500, 'lottery has correct balance after purchasing three tickets');

    await lotto.completeLottery(hash);

    let user1BalanceBeforeWinning = web3.eth.getBalance(user1).toNumber();
    let user2BalanceBeforeWinning = web3.eth.getBalance(user2).toNumber();
    var userBalanceAfterWinning;


    switch (parseInt(hash) % _ticketsAvailable) {
      case 1:
        userBalanceAfterWinning = web3.eth.getBalance(user1).toNumber();
        assert.equal(userBalanceAfterWinning, user1BalanceBeforeWinning+1500, 'after winning money is deposited');
        break;
      case 0:
        userBalanceAfterWinning = web3.eth.getBalance(user2).toNumber();
        assert.equal(userBalanceAfterWinning, user2BalanceBeforeWinning+1500, 'after winning money is deposited');
        break;
    }

  });
});
