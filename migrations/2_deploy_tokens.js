const EIP20 = artifacts.require('./EIP20.sol');

module.exports = (deployer) => {
  deployer.then(() => EIP20.new(10000, 'Simon Bucks', 1, 'SBX')).then((instance) => {
    console.log(`|${instance.address}|`);
  });
};
