# HUMAN Protocol - HMT Token Contract

> ## 👉 **Please see the [HUMAN Protocol GitHub org](https://github.com/humanprotocol/) for open source projects within the HUMAN ecosystem, or [visit humanprotocol.org](https://humanprotocol.org/) to learn more about the tech.** 👈

### :warning:  **This repo has been archived. Development is ongoing on the repos above.**



This legacy repo contains some of the early development work on the Bulk API and other interesting Ethereum improvements, as well as a reference implementation of the HMT token contract used in the HUMAN Protocol.



.
.
.



### *Legacy introduction*

This repository features the original source code for a reference implementation of the HMT token.

It includes a standard ERC20-compatible token along with a full implementation of a proposed EIP that extends the ERC20 token standard with more efficient bulk payments. Take a look at this blog post on the [Bulk API](https://medium.com/human-protocol/transfer-your-tokens-9-600x-more-efficiently-on-ethereum-using-the-bulk-api-fbc2f10669ed) for a detailed explanation and benchmark results. For more details about the protocol design you can also check out the white paper on [humanprotocol.org](https://humanprotocol.org).

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

## Acknowledgements
Thanks to ConsenSys for their work on the [ERC20 Token template](https://github.com/ConsenSys/Tokens), which provided a good starting point for this implementation.

## License
MIT &copy; HUMAN Protocol Foundation

## Audit Status

The HUMAN Protocol token contract (HMToken.sol) has been audited by several third parties, most recently CertiK. You can see the results of this audit in the `audits` directory. The code for this contract is stable and not expected to change materially in the future.

