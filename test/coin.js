const Coin = artifacts.require('./contracts/Coin.sol')
const CoinCollection = artifacts.require('./contracts/CoinCollection.sol')
const metaData = {
  "description": "The most exclusive collector's edition coin.",
  "image": "https://gateway.pinata.cloud/ipfs/QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Game Release"
}

contract('Coin', accounts => {
  let coinInstance
  let coinCollectionInstance
  before(async () => {
    coinInstance = await Coin.deployed()
    coinCollectionInstance = await CoinCollection.deployed()
  })
  describe('initialization', async () => {
    it('should create a Coin instance with an admin', async () => {
      const admin = await coinInstance.admin.call()
      assert.equal(admin, accounts[0])
    })
  })
  describe('updateCoinCollectionAddress', async () => {
    it('should update the collection address', async () => {
      await coinInstance.updateCoinCollectionAddress(
        coinCollectionInstance.address,
        {
          from: accounts[0]
        }
      )
  
      const coinCollectionAddress = await coinInstance.CoinCollectionAddress.call()
      assert.equal(coinCollectionAddress, coinCollectionInstance.address)
    })
    // it('should revert if not called by admin', async () => {
    //   assert.throws(await coinInstance.updateCoinCollectionAddress(
    //     coinCollectionInstance.address,
    //     {
    //       from: accounts[1]
    //     }
    //   ))
    // })
  })
})
