// COMMENT OUT TO UPGRADE
// const { deployProxy } = require('@openzeppelin/truffle-upgrades');

// const UpgradeablePet = artifacts.require('UpgradeablePet');

// module.exports = async function (deployer, network, accounts) {
//   await deployProxy(UpgradeablePet, [accounts[0]], { deployer, initializer: 'initialize' });
// };
//UNCOMMENT TO UPGRADE
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const UpgradeablePet = artifacts.require('UpgradeablePet');
const UpgradeablePetV2 = artifacts.require('UpgradeablePetV2');

module.exports = async function (deployer) {
  const alreadyDeployed = await UpgradeablePet.deployed();
  await upgradeProxy(alreadyDeployed.address, UpgradeablePetV2, { deployer });
};