const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const UpgradeablePet = artifacts.require("UpgradeablePet");

contract("UpgradeablePet (Proxy)", function (accounts) {
  it("should retrieve correctly stored value", async function () {
    const upgradeablePetInstance = await deployProxy(UpgradeablePet, [accounts[0]], { initializer: 'initialize' });
    let tx = await upgradeablePetInstance.store(5);
    expectEvent(tx, "ValueChanged", { value: "5" });
    let value = await upgradeablePetInstance.retrieve();
    assert.equal(value, 5, "UpgradeablePet did not store correct value");
  });
  it("should not set the stored value if not owner", async function () {
    const upgradeablePetInstance = await deployProxy(UpgradeablePet, [accounts[0]], { initializer: 'initialize' });
    // Failed require in function
    await expectRevert(upgradeablePetInstance.store(10, {from: accounts[1]}), "UpgradeablePet: not owner");
    let value = await upgradeablePetInstance.retrieve();
    assert.equal(value, 0, "UpgradeablePet value should not have changed");
  });
});
