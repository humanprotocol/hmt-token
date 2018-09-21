pragma solidity 0.4.24;

/*
Implements EIP20 token standard: https://github.com/ethereum/EIPs/issues/20
.*/

import "./SafeMath.sol";
import "./HMTokenInterface.sol";


contract HMToken is HMTokenInterface {
    using SafeMath for uint256;
    uint256 private constant MAX_UINT256 = 2**256 - 1;
    uint32  private constant BULK_MAX_COUNT = 100;
    uint32  private constant BULK_MAX_VALUE = 10000000;

    event BulkTransfer(uint256 indexed _txId, uint256 _bulkCount, uint256 _bulkValue);
    event BulkApproval(uint256 indexed _txId, uint256 _bulkCount, uint256 _bulkValue);

    mapping (address => bool) public pauseTransfer;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;

    string public name;
    uint8 public decimals;
    string public symbol;
    address public escrowFactory = 0;

    constructor(uint256 _totalSupply, string _name, uint8 _decimals, string _symbol) public {
        totalSupply = _totalSupply;
        name = _name;
        decimals = _decimals;
        symbol = _symbol;
        balances[msg.sender] = _totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        success = transferQuiet(_to, _value);
        if (!success) revert("Transfer didn't succeed");
        return success;
    }

    function transferFrom(address _spender, address _to, uint256 _value) public returns (bool success) {
        // Use of `totalSupply` precludes overflow of the recipient balance, so we can forego checking for it.
        uint256 _allowance = allowed[_spender][msg.sender];
        require(balances[_spender] >= _value && _allowance >= _value, "Spender balance or allowance too low");

        balances[_to] = balances[_to].add(_value);
        balances[_spender] = balances[_spender].sub(_value);
        if (_allowance < MAX_UINT256) { // Special case to approve unlimited transfers
            allowed[_spender][msg.sender] = allowed[_spender][msg.sender].sub(_value);
        }

        emit Transferral(_spender, _to, _value);

        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function increaseApproval(address _spender, uint _delta) public returns (bool success) {
        uint _oldValue = allowed[msg.sender][_spender];
        if (_oldValue + _delta < _oldValue || _oldValue + _delta == MAX_UINT256) { // Truncate upon overflow.
            allowed[msg.sender][_spender] = MAX_UINT256 - 1;
        } else {
            allowed[msg.sender][_spender] += _delta;
        }
        emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
        return true;
    }

    function decreaseApproval(address _spender, uint _delta) public returns (bool success) {
        uint _oldValue = allowed[msg.sender][_spender];
        if (_delta > _oldValue) { // Truncate upon overflow.
            allowed[msg.sender][_spender] = 0;
        } else {
            allowed[msg.sender][_spender] -= _delta;
        }
        emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    function transferBulk(address[] _tos, uint256[] _values, uint256 _txId) public returns (uint256 _bulkCount) {
        require(_tos.length == _values.length, "Amount of recipients and values don't match");
        require(_tos.length < BULK_MAX_COUNT, "Too many recipients");

        uint256 _bulkValue = 0;
        for (uint j = 0; j < _tos.length; ++j) {
            _bulkValue = _bulkValue.add(_values[j]);
        }
        require(_bulkValue < BULK_MAX_VALUE, "Bulk value too high");

        _bulkCount = 0;
        _bulkValue = 0;
        bool _success;
        for (uint i = 0; i < _tos.length; ++i) {
            _success = transferQuiet(_tos[i], _values[i]);
            if (_success) {
                _bulkCount = _bulkCount.add(1);
                _bulkValue = _bulkValue.add(_values[i]);
            }
        }
        emit BulkTransfer(_txId, _bulkCount, _bulkValue);
        return _bulkCount;
    }

    function approveBulk(address[] _spenders, uint256[] _values, uint256 _txId) public returns (uint256 _bulkCount) {
        require(_spenders.length == _values.length, "Amount of spenders and values don't match");
        require(_spenders.length < BULK_MAX_COUNT, "Too many spenders");

        uint256 _bulkValue = 0;
        for (uint j = 0; j < _spenders.length; ++j) {
            _bulkValue = _bulkValue.add(_values[j]);
        }
        require(_bulkValue < BULK_MAX_VALUE, "Bulk value too high");

        _bulkCount = 0;
        bool _success;
        for (uint i = 0; i < _spenders.length; ++i) {
            _success = increaseApproval(_spenders[i], _values[i]);
            if (_success) {
                _bulkCount = _bulkCount.add(1);
                _bulkValue = _bulkValue.add(_values[i]);
            }
        }
        emit BulkApproval(_txId, _bulkCount, _bulkValue);
        return _bulkCount;
    }

        // Like `transfer()`, but fails quietly.
    function transferQuiet(address _to, uint256 _value) internal returns (bool success) {
        // Use of `totalSupply` precludes overflow of the recipient balance, so we can forego checking for it.
        if (_to == address(0)) return false; // Preclude burning tokens to uninitialized address.
        if (_to == address(this)) return false; // Preclude sending tokens to the contract.
        if (balances[msg.sender] < _value) return false;

        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);

        emit Transferral(msg.sender, _to, _value);
        return true;
    }
}
