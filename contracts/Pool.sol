// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// make use of ERC20 or ERC777
contract Pool {
  address admin;

  /* Modifiers */
  modifier onlyAdmin() {
    require(msg.sender == admin);
    _;
  }
  constructor() public {
    admin = msg.sender;
  }

  function createPool(uint _value, uint _numToken)
    private
    onlyAdmin()
    returns (uint poolId) 
  {
    // creates a pool and mints ERC20 tokens (trophies)
    // mint should probably be a separate function
  }

  function sendTokens(address[] memory _recipients)
    public
    onlyAdmin()
  {
    // sends tokens to all listed recipients
    // is this necessary? should we hold tokens and allow folks to claim them?
  }

  function burnUnclaimed()
    public
    onlyAdmin()
  {
    // allow admin to burn unclaimed tokens
  }
}
