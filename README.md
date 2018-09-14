## HMT Token
The token powering [HUMAN Protocol](https://www.hmt.ai).

## Motivation
We open sourced our HMT token in order to prepare for the upcoming mainnet launch. This repository also features the source code for the EIP that brings bulk payments to the ERC20 token standard. Take a look at our blog post at [Bulk API](https://medium.com/p/fbc2f10669ed/edit) where we share more about our findings and benchmark results.

## Prerequisites
Three environment variables are needed to interact with the contract:
```
const { MNEMONIC, INFURA_TOKEN } = process.env;
```

`MNEMONIC` is a list containing 12 to 24 words that ensure certain entropy to our wallet's security. You can get your 12-word mnemonic easily from https://metamask.io/

`INFURA_TOKEN` is our gateway to the Ethereum blockchain and lets us easily interact with our contract without setting up our own node. You can get your token easily from https://infura.io/

Once you have setup all the needed prerequisites, setup your local `.env` file in the root of your project
```
touch .env
```
with the following content:
```
MNEMONIC=<your mnemonic>
INFURA_TOKEN=<your infura token>
```

## Installation
You need Node as your environmental dependency. At the moment this is guaranteed to work with Node 8.

```
npm install
npm run compile
```

## Testing
```
npm run test
```

## Deployment
If you want to deploy your HMT token to the Ethereum blockchain, you need to install Ganache first. Easiest way to get started is to install it from https://truffleframework.com/ganache

### Local deployment
```
truffle migrate
```

### Testnet deployment
Currently we support the following testnets: Mainnet, Kovan, Ropsten, Rinkeby.
```
truffle migrate --network ropsten
```

## Contribute
We welcome all pull requests! Please ensure you lint before the commit.
```
npm run lint
```
You can inspect more of our linting scripts at `package.json`.

Please submit your pull request against our `staging` branch.

## Acknowledgements
We want to give recognition to ConsenSys for their work on the [ERC20 Tokens](https://github.com/ConsenSys/Tokens) template as it has been the base of our work.

## License
MIT &copy; HUMAN Protocol
