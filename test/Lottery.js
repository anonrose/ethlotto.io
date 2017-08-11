require('babel-polyfill');

var Lottery = artifacts.require('./Lottery.sol');


contract('Lottery', function() {
  it("should deploy", async function() {
    let meta = await Lottery.deployed();
  });
});
