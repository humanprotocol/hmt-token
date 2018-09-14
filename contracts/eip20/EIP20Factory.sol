pragma solidity 0.4.24;
import "./EIP20.sol";


contract EIP20Factory {
    mapping(address => address[]) public created;
    mapping(address => bool) public isEIP20; //verify without having to do a bytecode check.
    bytes public EIP20ByteCode;
    address public verifiedToken;
    address public lastChild;
    address public creator = address(0);

    constructor() public {
        //upon creation of the factory, deploy a EIP20 (parameters are meaningless) and store the bytecode provably.
        verifiedToken = createEIP20(1000000000000, "Human Evaluation Token", 18, "HET");
        EIP20ByteCode = codeAt(verifiedToken);
        creator = msg.sender;
    }

    //verifies if a contract that has been deployed is a Human Standard Token.
    //NOTE: This is a very expensive function, and should only be used in an eth_call. ~800k gas
    function verifyEIP20(address _tokenContract) public view returns (bool) {
        bytes memory fetchedTokenByteCode = codeAt(_tokenContract);

        if (fetchedTokenByteCode.length != EIP20ByteCode.length) {
            return false; //clear mismatch
        }

      //starting iterating through it if lengths match
        for (uint i = 0; i < fetchedTokenByteCode.length; i++) {
            if (fetchedTokenByteCode[i] != EIP20ByteCode[i]) {
                return false;
            }
        }
        return true;
    }

    function tokenAddress() public view returns (address _verifiedToken) {
        return verifiedToken;
    }

    function createEIP20(uint256 _initialAmount, string _name, uint8 _decimals, string _symbol) public returns (address _newToken) {
        require(creator == address(0) || msg.sender == creator);
        creator = msg.sender;
        EIP20 newToken = (new EIP20(_initialAmount, _name, _decimals, _symbol));
        lastChild = address(newToken);
        created[msg.sender].push(lastChild);
        isEIP20[address(newToken)] = true;
        newToken.transfer(msg.sender, _initialAmount); //the factory will own the created tokens. You must transfer them.
        return address(newToken);
    }

    //for now, keeping this internal. Ideally there should also be a live version of this that any contract can use, lib-style.
    //retrieves the bytecode at a specific address.
    function codeAt(address _addr) internal view returns (bytes o_code) {
        assembly {
                // retrieve the size of the code, this needs assembly
                let size := extcodesize(_addr)
                // allocate output byte array - this could also be done without assembly
                // by using o_code = new bytes(size)
                o_code := mload(0x40)
                // new "memory end" including padding
                mstore(0x40, add(o_code, and(add(add(size, 0x20), 0x1f), not(0x1f))))
                // store length in memory
                mstore(o_code, size)
                // actually retrieve the code, this needs assembly
                extcodecopy(_addr, add(o_code, 0x20), 0, size)
        }
    }
}
