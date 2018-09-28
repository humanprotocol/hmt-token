# Contributing
## Advice for new contributors
Small tasks get merged easier as the scope of changes won't require wider review. We recommend starting with these.

Always create an `Issue` before doing a `Pull Request`. This helps us track our progress easier. We don't accept `Pull Requests` on their own.

Search through already labeled Issues such as `area:contracts` and `kind:feature`. You will get those merged easier as they are examined and identified already by one of our core committers.

If you want to start solving the `Issue`, please comment in it with something like: "I would like to take a stab at this". This will help us coordinate and distribute the workload.

See below for more guidelines on [Pull Requests](#pull-requests).
## Developer setup

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

## Docker (recommended)
Easiest way to run and test the contracts is to use [Docker](https://www.docker.com). If you want to pull this image and use it in your own projects, you can use the pre-built image [here](https://hub.docker.com/r/hcaptcha/hmt-token/): 

```
docker pull hcaptcha/hmt-token
```

In order to get going, you can run the following commands. These build the docker container and compile and migrate the contracts to the container's network.
```
bin/build
bin/run
```

### Local
You need at least Node 8 to run the project. Also [Ganache](https://truffleframework.com/ganache) is needed as a prerequisite. After that the following commands will get you through:
```
npm install
npm run compile
```

## Making Changes
When you are preparing to make your pull request, do the following things.
### Tests
If your task is labeled with anything that adds new functionality like `kind:feature` or `kind:improvement` please write the supporting tests as well.

The easiest way run all the tests is by running `bin/test`, which uses Docker to run the tests for you. You can also run the tests with a local setup through `npm run test`. Always remember to lint before you open your PR. You can either use `bin/lint` or `npm run lint` depending on your setup.
### Pull requests
Before your pull request, keep in mind the following things:
* Rebase your changes on the latest development branch, resolving any conflicts. This ensures that your changes will merge cleanly when you open your PR.
* Add tests and run your tests before the PR.
* Make sure the diff between our master and your branch contains the minimal amount of changes needed to implement the feature or bugfix. This speeds up the process of approving your PR and getting it to our codebase.
* Don't submit a PR with commented out code or unfinished features. We encourage however "PR early approach". The PR's that start with `WIP: <PR description>` can be opened even before you have a single line of code written. It also lets our core devs give important input down the way.
* Avoid meaningless commits such as "Oops typo" or "Just trying". However if your branch contains such commits, make sure to [squash or rebase](https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history) those away.
* Don't have too few commits either, it makes it very hard for the reviewer to understand the path to your solution. Commit small, commit often, squash later.
* Provide well written commit messages. We use the imperative form in our PRs: "Update README", "Add solhint to lint solidity code", "Add helper methods to tests to reduce repetitive code".
* Provide a well written Pull Request message. Include in your summary
    * What you changed
    * Why this change was made ([Use keywords](https://help.github.com/articles/closing-issues-using-keywords/) to close the issue e.g. Fixes #117)
    * Any relevant technical details or motivation for your implementation choices. Longer explanation is better than a shorter one when in doubt.

