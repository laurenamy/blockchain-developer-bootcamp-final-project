// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Coin.sol";

contract CoinCollection {
  address public admin;
  mapping (uint => address) collections;
  uint collectionCount;
  address coinAddress;
  bool private initialized;

  // do I need a struct to store the ERC20 address?

  event CollectionCreated(uint id);
  
  modifier onlyAdmin() {
    require(msg.sender == admin);
    _;
  }
  
  modifier onlyOwner(uint collectionId) {
    require(msg.sender == collections[collectionId]);
    _;
  }

  function initialize() public {
    require(!initialized, "Contract instance has already been initialized");
    initialized = true;
    admin = msg.sender;
    collectionCount = 0;
  }

  function createCollection(address _coinAddress, uint numCoins, string memory tokenURI) public
  {
    collections[collectionCount] = msg.sender;
    Coin coin = Coin(_coinAddress);
    coin.mintNFT(msg.sender, numCoins, tokenURI);
    emit CollectionCreated(collectionCount);
    collectionCount++;
  }
  
  // function getCollection(uint id) onlyOwner(id) public returns() {
  //     return collections[id];
  // }
}