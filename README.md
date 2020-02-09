# <img height="60px" src="./static/human.svg" alt="human" />

![Twitter Follow](https://img.shields.io/twitter/follow/hCaptcha.svg?style=social&label=Follow)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![Travis Build Status](https://travis-ci.org/hCaptcha/hmt-token.svg?branch=master)](https://travis-ci.org/hCaptcha/hmt-token)
[![Docker Automated build](https://img.shields.io/docker/automated/hcaptcha/hmt-token.svg)](https://hub.docker.com/r/hcaptcha/hmt-token/)


This repository features the source code for our HMT token.

It includes a standard ERC20-compatible token along with a full implementation of our upcoming EIP that extends the ERC20 token standard with more efficient bulk payments. Take a look at our blog post on the [Bulk API](https://medium.com/human-protocol/transfer-your-tokens-9-600x-more-efficiently-on-ethereum-using-the-bulk-api-fbc2f10669ed) for a detailed explanation and benchmark results. For more details about the protocol design you can also check out our white paper on [HUMAN](https://www.hmt.ai).

## Prerequisites
With these steps you can compile and migrate the contract to your local Ganache easily.

The following environment variables are needed to interact with the contracts:

```
const { MNEMONIC, INFURA_TOKEN, HET_HOST, HET_PORT } = process.env;
```

`MNEMONIC` is a list containing 12 to 24 words that ensure certain entropy to our wallet's security. You can get your 12-word mnemonic easily from https://metamask.io/

`INFURA_TOKEN` is our gateway to the Ethereum blockchain and lets us easily interact with our contract without setting up our own node. You can get your token easily from https://infura.io/

`ETH_HOST` the gateway to ethereum. Defaults to localhost if not given.

`ETH_PORT` the port used to access ganache. Defaults to 8545 if not given.

Once you have setup all the token and the mnemonic, create your local `.env` file in the root of your project:

```
touch .env
```

with the following content:

```
MNEMONIC=<your mnemonic>
INFURA_TOKEN=<your infura token>
ETH_HOST=<your eth host>
ETH_PORT=<your eth port>
```

## Running the project
### Docker (recommended)
Just run `bin/run` and you will compile and migrate the contracts to the local Ganache running inside your Docker container automatically.

### Manual
You need at least Node 8 to run the project. Also [Ganache](https://truffleframework.com/ganache) is needed as a prerequisite. After that the following commands will get you through:
```
npm install
npm run compile
```

## Got a question?
Join our [Telegram](https://t.me/hcaptchachat) channel, we will gladly answer your questions.

## Found a bug?
Please search for any existing issues at our [Issues](https://github.com/hCaptcha/hmt-token/issues) page before submitting your own.

Also check our [Bug Bounty Program](https://github.com/hCaptcha/bounties).

## Contributions
Interesting in contributing to the project? Please see our [Contributing guidelines](https://github.com/hCaptcha/hmt-token/blob/master/CONTRIBUTING.md) and check our instructions for setting up the project and getting your commits to the codebase.

## Acknowledgements
Thanks to ConsenSys for their work on the [ERC20 Token template](https://github.com/ConsenSys/Tokens), which provided a good starting point for our implementation.

## License
MIT &copy; HUMAN Protocol

## Audit Status

The HUMAN Protocol token contract (HMToken.sol) has been audited by several third parties, most recently CertiK. You can see the results of this audit in the `audits` directory. The code for this contract is stable and not expected to change materially in the future.

