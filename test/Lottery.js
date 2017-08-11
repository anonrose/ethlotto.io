require('babel-polyfill');

var Lottery = artifacts.require('Lottery');


contract('Lottery', function([admin, ...addresses]) {

  it("should deploy", async function() {
    let lotto = await Lottery.deployed();
    assert.ok(1);
  });

  it("has correct admin", async function() {
    let lotto = await Lottery.deployed();
    let contractAdmin = await lotto.admin();
    assert.equal(admin, contractAdmin, `correct admin is set`);
  });

});
