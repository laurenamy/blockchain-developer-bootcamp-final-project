const { it } = require("ethers/wordlists")

const CoinCollection = artifacts.require('./contracts/CoinCollection.sol')
const Coin = artifacts.require('./contracts/Coin.sol')
const metaData = {
  "description": "The most exclusive collector's edition coin.",
  "image": "https://gateway.pinata.cloud/ipfs/QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Game Release"
}

contract('Coin Collection', accounts => {
  let coinInstance
  let coinCollectionInstance
  before(async () => {
    coinInstance = await Coin.deployed()
    coinCollectionInstance = await CoinCollection.deployed()
  })
  it('should initialize the coin collection contract', async () => {
    await coinCollectionInstance.initialize({ from: accounts[0] })

    const admin = await coinCollectionInstance.admin.call()
    assert.equal(accounts[0], admin)
  })
  it('should create a coin collection', async () => {
    const event =  await coinCollectionInstance.createCollection(
      coinInstance.address,
      3,
      metaData,
    { 
      from: accounts[1] 
    });

    const balance = await coinInstance.balanceOf(accounts[1])
    
    assert.equal(balance, 3)
    assert.equal(event.logs[0].event, 'CollectionCreated')
  })
  it('should return the collection id', async () => {
    
  })
})
