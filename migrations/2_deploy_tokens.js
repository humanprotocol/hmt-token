const EIP20 = artifacts.require('./EIP20.sol');

module.exports = (deployer) => {
  deployer.deploy(EIP20, 1000000000000, 'Human Token', 18, 'HMT');
};
