require('dotenv').config()

const { INFURA_TOKEN, MNEMONIC } = process.env;
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    live: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://mainnet.infura.io/${INFURA_TOKEN}`),
      network_id: '1',
    },
    kovan: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://kovan.infura.io/${INFURA_TOKEN}`),
      network_id: '2',
    },
    ropsten: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://ropsten.infura.io/${INFURA_TOKEN}`),
      network_id: '3',
      gas: 4700000,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/${INFURA_TOKEN}`),
      network_id: '4',
    },
  },
};
