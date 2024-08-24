// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/math/Math.sol";

import "./Wallet.sol";

contract StakingPool is Wallet {
    event Staked(address indexed user, uint amount);
    event UnStaked(address indexed user, uint256 amount);

    address[] public stakers; // addresses that have active stakes
    mapping(address => uint) public stakes;
    uint public totalStakes;

    constructor(address, address _lpTokenAddress) Wallet(_lpTokenAddress) {}

    function depositAndStartStake(uint256 amount) public {
        deposit(amount);
        startStake(amount);
    }

    function endStakeAndWithdraw(uint amount) public {
        endStake(amount);
        withdraw(amount);
    }

    function startStake(uint amount) public virtual {
        require(amount > 0, "Stake must be a positive amount greater than 0");
        require(balances[msg.sender] >= amount, "Not enough tokens to stake");

        // move tokens from lp token balance to the staked balance
        balances[msg.sender] -= amount;
        stakes[msg.sender] += amount;

        totalStakes += amount;

        emit Staked(msg.sender, amount);
    }

    function endStake(uint amount) public virtual {
        require(stakes[msg.sender] >= amount, "Not enough tokens staked");

        // return lp tokens to lp token balance
        balances[msg.sender] += amount;
        stakes[msg.sender] -= amount;

        totalStakes -= amount;

        emit UnStaked(msg.sender, amount);
    }

    function getStakedBalance() public view returns (uint) {
        return stakes[msg.sender];
    }
}
