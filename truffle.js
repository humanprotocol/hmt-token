require('dotenv').config()

const { INFURA_TOKEN, MNEMONIC } = process.env;
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, host),
      network_id: '3',
      gas: 5300000,
    },
  },
};
