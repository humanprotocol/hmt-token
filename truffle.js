const fs = require('fs');
const HDWalletProvider = require('truffle-hdwallet-provider');

const host = process.env.HET_ETH_SERVER || 'localhost';
const port = process.env.HET_ETH_PORT || 8545;
const mnemonic = process.env.MNEMONIC;

// First read in the secrets.json to get our mnemonic
let account = process.env.ACCOUNT;
const accountFile = '/account/account';
if (fs.existsSync(accountFile)) {
  account = `0x${fs.readFileSync(accountFile, 'utf8').trim()}`;
  console.log(`Found account file with account:${account}`);
}
console.log(`Account:|${account}|`);
console.log(`Host:|${host}|`);
console.log(`Port:|${port}|`);
console.log(`Mnemonic:|${mnemonic}|`);

module.exports = {
  networks: {
    local: {
      host,
      port,
      from: account,
      network_id: '*',
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, host),
      network_id: '3',
      gas: 5300000,
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
