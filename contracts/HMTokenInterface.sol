pragma solidity 0.5.9;

// Abstract contract for the full ERC 20 Token standard
// https://github.com/ethereum/EIPs/issues/20

contract HMTokenInterface {
    /* This is a slight change to the ERC20 base standard.
    function totalSupply() constant returns (uint256 supply);
    is replaced with:
    uint256 public totalSupply;
    This automatically creates a getter function for the totalSupply.
    This is moved to the base contract since public getter functions are not
    currently recognised as an implementation of the matching abstract
    function by the compiler.
    */
    /// total amount of tokens
    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event BulkTransfer(uint256 indexed _txId, uint256 _bulkCount);
    event BulkTransferFailure(uint256 indexed _txId, uint256 _bulkCount);
    event BulkApproval(uint256 indexed _txId, uint256 _bulkCount);
    event BulkApprovalFailure(uint256 indexed _txId, uint256 _bulkCount);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) public returns (bool success);

    /// @notice send `_values` tokens to `_tos` from `msg.sender`
    /// @param _tos The addresses of the recipients
    /// @param _values The amount of tokens to be transferred
    /// @return Number of transfers completed
    function transferBulk(address[] memory _tos, uint256[] memory _values, uint256 _txId) public returns (uint256 _bulkCount);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);

    /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of tokens to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) public returns (bool success);

    /// @notice `msg.sender` approves `_spenders` to spend `_values` tokens
    /// @param _spenders The addresses of the accounts able to transfer the tokens
    /// @param _values The amount of tokens to be approved for transfers
    /// @return Number of approvals completed
    function approveBulk(address[] memory _spenders, uint256[] memory _values, uint256 _txId) public returns (uint256 _bulkCount);

    /// @notice `msg.sender` increases `_spender` to spend `_delta` more tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _delta The amount of tokens more to be approved for transfer
    /// @return Whether the approval increase was successful or not
    function increaseApproval(address _spender, uint256 _delta) public returns (bool success);

    /// @notice `msg.sender` decreases `_spender` to spend `_delta` less tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _delta The amount of tokens less to be approved for transfer
    /// @return Whether the approval decrease was successful or not
    function decreaseApproval(address _spender, uint256 _delta) public returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) public view returns (uint256 remaining);

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) public view returns (uint256 balance);
}
