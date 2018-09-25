const { assertRevert } = require('./helpers/assertRevert');

const HMTokenAbstraction = artifacts.require('HMToken');
const { BigNumber } = web3;
let HMT;
let supply;

contract('HMToken', (accounts) => {
  beforeEach(async () => {
    supply = new BigNumber('100').toNumber();
    HMT = await HMTokenAbstraction.new(supply, 'Human Token', 4, 'HMT', { from: accounts[0] });
  });

  it('creation: should create an initial balance of 1000000 for the creator', async () => {
    const balance = await HMT.balanceOf.call(accounts[0]);
    assert.strictEqual(balance.toNumber(), 1000000);
  });

  it('creation: test correct setting of vanity information', async () => {
    const name = await HMT.name.call();
    assert.strictEqual(name, 'Human Token');

    const decimals = await HMT.decimals.call();
    assert.strictEqual(decimals.toNumber(), 4);

    const symbol = await HMT.symbol.call();
    assert.strictEqual(symbol, 'HMT');
  });

  // TRANSFERS
  // normal transfers without approvals
  it('transfers: ether transfer should be reversed.', async () => {
    const balanceBefore = await HMT.balanceOf.call(accounts[0]);
    assert.strictEqual(balanceBefore.toNumber(), 1000000);

    await assertRevert(new Promise((resolve, reject) => {
      web3.eth.sendTransaction({ from: accounts[0], to: HMT.address, value: web3.toWei('10', 'Ether') }, (err, res) => {
        if (err) { reject(err); }
        resolve(res);
      });
    }));

    const balanceAfter = await HMT.balanceOf.call(accounts[0]);
    assert.strictEqual(balanceAfter.toNumber(), 1000000);
  });

  it('transfers: should transfer 10000 to accounts[1] with accounts[0] having 10000', async () => {
    await HMT.transfer(accounts[1], 1000000, { from: accounts[0] });
    const balance = await HMT.balanceOf.call(accounts[1]);
    assert.strictEqual(balance.toNumber(), 1000000);
  });

  it('transfers: should fail when trying to transfer 10001 to accounts[1] with accounts[0] having 10000', async () => {
    await assertRevert(HMT.transfer.call(accounts[1], 1000001, { from: accounts[0] }));
  });

  it('transfers: should handle zero-transfers normally', async () => {
    assert(await HMT.transfer.call(accounts[1], 0, { from: accounts[0] }), 'zero-transfer has failed');
  });

  // NOTE: testing uint256 wrapping is impossible since you can't supply > 2^256 -1
  // todo: transfer max amounts

  // APPROVALS
  it('approvals: msg.sender should approve 100 to accounts[1]', async () => {
    await HMT.approve(accounts[1], 100, { from: accounts[0] });
    const allowance = await HMT.allowance.call(accounts[0], accounts[1]);
    assert.strictEqual(allowance.toNumber(), 100);
  });

  // bit overkill. But is for testing a bug
  it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 once.', async () => {
    const balance0 = await HMT.balanceOf.call(accounts[0]);
    assert.strictEqual(balance0.toNumber(), 1000000);

    await HMT.approve(accounts[1], 100, { from: accounts[0] }); // 100
    const balance2 = await HMT.balanceOf.call(accounts[2]);
    assert.strictEqual(balance2.toNumber(), 0, 'balance2 not correct');

    await HMT.transferFrom.call(accounts[0], accounts[2], 20, { from: accounts[1] });
    await HMT.allowance.call(accounts[0], accounts[1]);
    await HMT.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] }); // -20
    const allowance01 = await HMT.allowance.call(accounts[0], accounts[1]);
    assert.strictEqual(allowance01.toNumber(), 80); // =80

    const balance22 = await HMT.balanceOf.call(accounts[2]);
    assert.strictEqual(balance22.toNumber(), 20);

    const balance02 = await HMT.balanceOf.call(accounts[0]);
    assert.strictEqual(balance02.toNumber(), 999980);
  });

  // should approve 100 of msg.sender & withdraw 50, twice. (should succeed)
  it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 twice.', async () => {
    await HMT.approve(accounts[1], 100, { from: accounts[0] });
    const allowance01 = await HMT.allowance.call(accounts[0], accounts[1]);
    assert.strictEqual(allowance01.toNumber(), 100);

    await HMT.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] });
    const allowance012 = await HMT.allowance.call(accounts[0], accounts[1]);
    assert.strictEqual(allowance012.toNumber(), 80);

    const balance2 = await HMT.balanceOf.call(accounts[2]);
    assert.strictEqual(balance2.toNumber(), 20);

    const balance0 = await HMT.balanceOf.call(accounts[0]);
    assert.strictEqual(balance0.toNumber(), 999980);

    // FIRST tx done.
    // onto next.
    await HMT.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] });
    const allowance013 = await HMT.allowance.call(accounts[0], accounts[1]);
    assert.strictEqual(allowance013.toNumber(), 60);

    const balance22 = await HMT.balanceOf.call(accounts[2]);
    assert.strictEqual(balance22.toNumber(), 40);

    const balance02 = await HMT.balanceOf.call(accounts[0]);
    assert.strictEqual(balance02.toNumber(), 999960);
  });

  // should approve 100 of msg.sender & withdraw 50 & 60 (should fail).
  it('approvals: msg.sender approves accounts[1] of 100 & withdraws 50 & 60 (2nd tx should fail)', async () => {
    await HMT.approve(accounts[1], 100, { from: accounts[0] });
    const allowance01 = await HMT.allowance.call(accounts[0], accounts[1]);
    assert.strictEqual(allowance01.toNumber(), 100);

    await HMT.transferFrom(accounts[0], accounts[2], 50, { from: accounts[1] });
    const allowance012 = await HMT.allowance.call(accounts[0], accounts[1]);
    assert.strictEqual(allowance012.toNumber(), 50);

    const balance2 = await HMT.balanceOf.call(accounts[2]);
    assert.strictEqual(balance2.toNumber(), 50);

    const balance0 = await HMT.balanceOf.call(accounts[0]);
    assert.strictEqual(balance0.toNumber(), 999950);

    // FIRST tx done.
    // onto next.
    await assertRevert(HMT.transferFrom.call(accounts[0], accounts[2], 60, { from: accounts[1] }));
  });

  it('approvals: attempt withdrawal from account with no allowance (should fail)', async () => {
    await assertRevert(HMT.transferFrom.call(accounts[0], accounts[2], 60, { from: accounts[1] }));
  });

  it('approvals: allow accounts[1] 100 to withdraw from accounts[0]. Withdraw 60 and then approve 0 & attempt transfer.', async () => {
    await HMT.approve(accounts[1], 100, { from: accounts[0] });
    await HMT.transferFrom(accounts[0], accounts[2], 60, { from: accounts[1] });
    await HMT.approve(accounts[1], 0, { from: accounts[0] });
    await assertRevert(HMT.transferFrom.call(accounts[0], accounts[2], 10, { from: accounts[1] }));
  });

  it('approvals: approve max (2^256 - 1)', async () => {
    await HMT.approve(accounts[1], '115792089237316195423570985008687907853269984665640564039457584007913129639935', { from: accounts[0] });
    const allowance = await HMT.allowance(accounts[0], accounts[1]);
    assert(allowance.equals('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77'));
  });

  // should approve max of msg.sender & withdraw 20 without changing allowance (should succeed).
  it('approvals: msg.sender approves accounts[1] of max (2^256 - 1) & withdraws 20', async () => {
    const balance0 = await HMT.balanceOf.call(accounts[0]);
    assert.strictEqual(balance0.toNumber(), 1000000);

    const max = '1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77';
    await HMT.approve(accounts[1], max, { from: accounts[0] });
    const balance2 = await HMT.balanceOf.call(accounts[2]);
    assert.strictEqual(balance2.toNumber(), 0, 'balance2 not correct');

    await HMT.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] });
    const allowance01 = await HMT.allowance.call(accounts[0], accounts[1]);
    assert(allowance01.equals(max));

    const balance22 = await HMT.balanceOf.call(accounts[2]);
    assert.strictEqual(balance22.toNumber(), 20);

    const balance02 = await HMT.balanceOf.call(accounts[0]);
    assert.strictEqual(balance02.toNumber(), 999980);
  });

  /* eslint-disable no-underscore-dangle */
  it('events: should fire Transfer event properly', async () => {
    const res = await HMT.transfer(accounts[1], '2666', { from: accounts[0] });
    const transferLog = res.logs.find(element => element.event.match('Transfer'));
    assert.strictEqual(transferLog.args._from, accounts[0]);
    assert.strictEqual(transferLog.args._to, accounts[1]);
    assert.strictEqual(transferLog.args._value.toString(), '2666');
  });

  it('events: should fire Transfer event normally on a zero transfer', async () => {
    const res = await HMT.transfer(accounts[1], '0', { from: accounts[0] });
    const transferLog = res.logs.find(element => element.event.match('Transfer'));
    assert.strictEqual(transferLog.args._from, accounts[0]);
    assert.strictEqual(transferLog.args._to, accounts[1]);
    assert.strictEqual(transferLog.args._value.toString(), '0');
  });

  it('events: should fire Approval event properly', async () => {
    const res = await HMT.approve(accounts[1], '2666', { from: accounts[0] });
    const approvalLog = res.logs.find(element => element.event.match('Approval'));
    assert.strictEqual(approvalLog.args._owner, accounts[0]);
    assert.strictEqual(approvalLog.args._spender, accounts[1]);
    assert.strictEqual(approvalLog.args._value.toString(), '2666');
  });

  it('events: should fire BulkTransfer event properly', async () => {
    const addresses = [accounts[1], accounts[2], accounts[3]];
    const amounts = [1, 2, 3];
    const res = await HMT.transferBulk(addresses, amounts, 101);
    res.logs.find(element => element.event.match('Transfer'));
    res.logs.find(element => element.event.match('BulkTransfer'));
    const balance02 = await HMT.balanceOf.call(accounts[0]);
    assert.strictEqual(balance02.toNumber(), 999994);
  });

  it('events: should fire BulkApproveevent properly', async () => {
    const addresses = [accounts[1], accounts[2], accounts[3]];
    const amounts = [1, 2, 3];
    const res = await HMT.approveBulk(addresses, amounts, 101);
    res.logs.find(element => element.event.match('Approve'));
    res.logs.find(element => element.event.match('BulkApprove'));
  });
});
