# HET Token

Currently creates a token with createEIP20(1000000000000,"Human Evaluation Token", 18, "HET");

You can test and compile everything with ```./bin/buildandrun```. You can also pass different commands as the first option. For instance to deploy the contract to localhost:8545 run ```./bin/buildandrun 'npm run migrate'```. Migrate prints the address of all of the contracts and the EIP20 token itself. Although generally it's safer to run ```./bin/buildandrun 'npm run console'```, and then type migrate to deploy. Once the contract is deployed you can inspect the contract for safety.

# TODO:
[ ] - Set the ACCOUNT var to 0x
