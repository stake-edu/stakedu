// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// TODO:- Rename to StakingToken
contract CakeLP is ERC20 {
    constructor() ERC20("Pancake LPs", "Cake-LP") {
        _mint(msg.sender, 100 * (10 ** decimals()));
    }
}
