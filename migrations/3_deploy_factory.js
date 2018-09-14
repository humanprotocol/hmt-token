const fs = require('fs');

const EIP20Factory =
  artifacts.require('./EIP20Factory.sol');
module.exports = (deployer) => {
  deployer.then(() => EIP20Factory.new()).then((instance) => {
    console.log(`|${instance.address}|`);
    return EIP20Factory.at(instance.address).tokenAddress();
  }).then((token) => {
    console.log(`Deployed token to:${token}|`);
    if (fs.existsSync('/account')) {
      fs.writeFile('/account/account.txt', token, (err) => {
        if (err) throw err;
        console.log('Wrote! out account file');
      });
    }
  });
};
