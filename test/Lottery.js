require('babel-polyfill');

var Lottery = artifacts.require('Lottery');


contract('Lottery', function() {
  it("should deploy", async function() {
    let lotto = await Lottery.deployed();
    assert.equal(1,1, "10000 wasn't in the first account");
  });
});
