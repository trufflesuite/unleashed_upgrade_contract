
const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const UpgradeablePet = artifacts.require("UpgradeablePet");
const UpgradeablePetV2 = artifacts.require("UpgradeablePetV2");

contract("UpgradeablePetV2 (Proxy)", function (accounts) {
  it("should increment the stored value", async function () {
    const upgradeablePetInstance = await deployProxy(UpgradeablePet, [accounts[0]], { initializer: 'initialize' });
    await upgradeablePetInstance.store(5);
    let value = await upgradeablePetInstance.retrieve();
    assert.equal(value, 5, "UpgradeablePet did not store correct value");
    const upgradeablePetV2Instance = await upgradeProxy(upgradeablePetInstance.address, UpgradeablePetV2);
    value = await upgradeablePetV2Instance.retrieve();
    assert.equal(value, 5, "UpgradeablePetV2 did not store correct value");
    await upgradeablePetV2Instance.increment();
    value = await upgradeablePetV2Instance.retrieve();
    assert.equal(value, 6, "UpgradeablePetV2 did not increment");
  });
});
