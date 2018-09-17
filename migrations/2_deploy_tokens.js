const HMToken = artifacts.require('./EIP20.sol');

module.exports = (deployer) => {
  deployer.deploy(HMToken, 1000000000000, 'Human Token', 18, 'HMT');
};
