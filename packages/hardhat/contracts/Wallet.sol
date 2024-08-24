// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Wallet is Ownable {
    // Use this address to represent native ETH, rather than ERC20 token
    address internal constant NATIVE = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    IERC20 internal token;

    // Token balances
    mapping(address => uint256) public balances;

    // users that deposited tokens into their balances
    address[] internal usersArray;
    mapping(address => bool) internal users;

    constructor(address token_) Ownable(msg.sender) {
        token = IERC20(token_);
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function deposit(uint256 amount) public payable {
        require(amount > 0, "Deposit amount should not be 0");

        if (address(token) == NATIVE) {
            require(amount == msg.value, "Value mismatch");
        } else {
            require(token.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");
            SafeERC20.safeTransferFrom(token, msg.sender, address(this), amount);
        }

        // remember addresses that deposited tokens
        if (!users[msg.sender]) {
            users[msg.sender] = true;
            usersArray.push(msg.sender);
        }

        balances[msg.sender] += amount;

        emit Deposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient token balance");

        balances[msg.sender] -= amount;
        if (address(token) == NATIVE) {
            payable(msg.sender).transfer(amount);
        } else {
            SafeERC20.safeTransfer(token, msg.sender, amount);
        }

        emit Withdrawn(msg.sender, amount);
    }
}
