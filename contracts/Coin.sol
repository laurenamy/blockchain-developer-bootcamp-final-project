//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Coin is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public admin;
    address public CoinCollectionAddress;

    constructor() ERC721("CoinCollection", "COIN") {
      admin = msg.sender;
    }

    modifier onlyAdmin() {
      require(msg.sender == admin, "This function can only be called by an admin");
      _;
    }

    modifier onlyCoinCollection() {
      require(msg.sender == CoinCollectionAddress, "This function can only be called by the Coin Collection dapp");
      _;
    }

    function updateCoinCollectionAddress(address _coinCollectionAddress)
      public
      onlyAdmin
    {
      require(_coinCollectionAddress != CoinCollectionAddress);
      CoinCollectionAddress = _coinCollectionAddress;
    }

    function mintNFT(address recipient, uint numCoins, string memory tokenURI)
        public
    {
      for (uint i=0; i<numCoins; i++) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
      }
    }
}
