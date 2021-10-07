const CoinCollection = artifacts.require("CoinCollection");

module.exports = function (deployer) {
  deployer.deploy(CoinCollection);
};
