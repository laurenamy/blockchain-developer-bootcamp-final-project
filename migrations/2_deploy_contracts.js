const CoinCollection = artifacts.require('CoinCollection')
const Coin = artifacts.require('Coin')

module.exports = function (deployer) {
  deployer.deploy(CoinCollection)
  deployer.deploy(Coin)
}
