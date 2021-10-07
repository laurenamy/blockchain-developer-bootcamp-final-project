const Migrations = artifacts.require("Migrations");
const CoinCollection = artifacts.require("CoinCollection");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CoinCollection);
};
