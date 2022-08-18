// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract UpgradeablePet is Initializable {
  uint256 private _value;
  address private _petOwner;

  // Emitted when the stored value changes
  event ValueChanged(uint256 value);

  function initialize(address petOwner) public initializer {
    _petOwner = petOwner;
  }

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() initializer {}

  // Stores a new value in the contract
  function store(uint256 value) public {
    require(msg.sender == _petOwner, "UpgradeablePet: not owner");
    _value = value;
    emit ValueChanged(value);
  }

  // Reads the last stored value
  function retrieve() public view returns (uint256) {
      return _value;
  }
}
