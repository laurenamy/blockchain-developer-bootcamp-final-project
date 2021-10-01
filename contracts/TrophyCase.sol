// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TrophyCase {
  address owner;

  /* Modifiers */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  constructor() public {
    owner = msg.sender;
  }

  function forceStop(uint _contestId)
    private
    onlyOwner()
    returns (uint) 
  {
    // should force stop a Pool and return all eth to owner
  }
}
