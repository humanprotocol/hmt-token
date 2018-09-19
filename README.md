# <img height="60px" src="./static/human.svg" alt="human" />

![Twitter Follow](https://img.shields.io/twitter/follow/hCaptcha.svg?style=social&label=Follow)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![Travis Build Status](https://travis-ci.com/hCaptcha/hmt-token.svg?token=byLvtSyyx2YcM61JU8NG&branch=master)](https://travis-ci.com/hCaptcha/hmt-token)
[![Docker Automated build](https://img.shields.io/docker/automated/hcaptcha/hmt-token.svg)](https://hub.docker.com/r/hcaptcha/hmt-token/)


This repository features the source code for our HMT token.

It includes a standard ERC20-compatible token along with a full implementation of our upcoming EIP that extends the ERC20 token standard with more efficient bulk payments. Take a look at our blog post on the [Bulk API](https://medium.com/human-protocol/transfer-your-tokens-9-600x-more-efficiently-on-ethereum-using-the-bulk-api-fbc2f10669ed) for a detailed explanation and benchmark results. For more details about the protocol design you can also check out our white paper on [HUMAN](https://www.hmt.ai).

## Installation and setup

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

## Usage

### Docker
Easiest way to run and test the contracts is to use [Docker](https://www.docker.com). The commands for docker usage can be found from the `bin/` folder.

If you want to pull this image and use it in your own projects, you can use the pre-built image [here](https://hub.docker.com/r/hcaptcha/hmt-token/): 

```bash
docker run -it hcaptcha/hmt-token
```

### Local
Locally ran [Ganache](https://truffleframework.com/ganache) is needed on the local machine. After that `npm run compile` compiles and migrates the contracts to the network. More commands can be found from the `package.json` script section.

## Contribute
We welcome all pull requests! Please ensure you lint before the commit.

Please submit your pull request against our `staging` branch.

## Acknowledgements
Thanks to ConsenSys for their work on the [ERC20 Token template](https://github.com/ConsenSys/Tokens), which provided a good starting point for our implementation.

## License
MIT &copy; HUMAN Protocol
