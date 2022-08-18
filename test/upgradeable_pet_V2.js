const { expectEvent } = require('@openzeppelin/test-helpers');
const UpgradeablePetV2 = artifacts.require("UpgradeablePetV2");

contract("UpgradeablePetV2", function (accounts) {
  it("should increment the stored value", async function () {
    const upgradeablePetV2Instance = await UpgradeablePetV2.deployed();
    let tx = await upgradeablePetV2Instance.store(5);
    expectEvent(tx, "ValueChanged", { value: "5" });
    let value = await upgradeablePetV2Instance.retrieve();
    assert.equal(value, 5, "UpgradeablePetV2 did not store correct value");
    await upgradeablePetV2Instance.increment();
    value = await upgradeablePetV2Instance.retrieve();
    assert.equal(value, 6, "UpgradeablePetV2 did not increment");
  });
});
