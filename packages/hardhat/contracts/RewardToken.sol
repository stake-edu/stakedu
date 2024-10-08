// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    constructor() ERC20("Open Campus Points", "OCP") {
        _mint(msg.sender, 100_000_000 * (10 ** decimals()));
    }
}
