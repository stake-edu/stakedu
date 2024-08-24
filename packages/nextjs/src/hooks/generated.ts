import {
  createReadContract,
  createSimulateContract,
  createWatchContractEvent,
  createWriteContract,
} from "@wagmi/core/codegen";
import {
  createUseReadContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
  createUseWriteContract,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RewardToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rewardTokenAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StakingPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakingPoolAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "_lpTokenAddress", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    inputs: [{ name: "target", internalType: "address", type: "address" }],
    name: "AddressEmptyCode",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "AddressInsufficientBalance",
  },
  { type: "error", inputs: [], name: "FailedInnerCall" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "SafeERC20FailedOperation",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Deposited",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Staked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "UnStaked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Withdrawn",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "balances",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "depositAndStartStake",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "endStake",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "endStakeAndWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "getBalance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getStakedBalance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "stakers",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "stakes",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "startStake",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "totalStakes",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StakingRewardPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakingRewardPoolAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_rewardTokenAddress", internalType: "address", type: "address" },
      { name: "_lpTokenAddress", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    inputs: [{ name: "target", internalType: "address", type: "address" }],
    name: "AddressEmptyCode",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "AddressInsufficientBalance",
  },
  { type: "error", inputs: [], name: "FailedInnerCall" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "SafeERC20FailedOperation",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Deposited",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "reward",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "RewardPaid",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Staked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "UnStaked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Withdrawn",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "balances",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "claimableReward",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "index", internalType: "uint256", type: "uint256" }],
    name: "deleteRewardPeriod",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "depositAndStartStake",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "endStake",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "endStakeAndWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "getBalance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getCurrentRewardPeriodId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getRewardPeriodsCount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getRewardsStats",
    outputs: [
      {
        name: "",
        internalType: "struct StakingRewardPool.RewardsStats",
        type: "tuple",
        components: [
          {
            name: "claimableRewards",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "rewardsPaid", internalType: "uint256", type: "uint256" },
          { name: "rewardRate", internalType: "uint256", type: "uint256" },
          {
            name: "totalRewardsPaid",
            internalType: "uint256",
            type: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getStakedBalance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "reward", internalType: "uint256", type: "uint256" },
      { name: "from", internalType: "uint256", type: "uint256" },
      { name: "to", internalType: "uint256", type: "uint256" },
    ],
    name: "newRewardPeriod",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "rewardBalance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "index", internalType: "uint256", type: "uint256" }],
    name: "rewardPeriods",
    outputs: [
      {
        name: "",
        internalType: "struct StakingRewardPool.RewardPeriod",
        type: "tuple",
        components: [
          { name: "id", internalType: "uint256", type: "uint256" },
          { name: "reward", internalType: "uint256", type: "uint256" },
          { name: "from", internalType: "uint256", type: "uint256" },
          { name: "to", internalType: "uint256", type: "uint256" },
          { name: "lastUpdated", internalType: "uint256", type: "uint256" },
          { name: "totalStaked", internalType: "uint256", type: "uint256" },
          {
            name: "rewardPerTokenStaked",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "totalRewardsPaid",
            internalType: "uint256",
            type: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "stakers",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "stakes",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "startStake",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "totalStakes",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StakingToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakingTokenAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Wallet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const walletAbi = [
  {
    type: "constructor",
    inputs: [{ name: "token_", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    inputs: [{ name: "target", internalType: "address", type: "address" }],
    name: "AddressEmptyCode",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "AddressInsufficientBalance",
  },
  { type: "error", inputs: [], name: "FailedInnerCall" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "SafeERC20FailedOperation",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Deposited",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Withdrawn",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "balances",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [],
    name: "getBalance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "spender", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rewardTokenAbi}__
 */
export const readRewardToken = /*#__PURE__*/ createReadContract({
  abi: rewardTokenAbi,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const readRewardTokenAllowance = /*#__PURE__*/ createReadContract({
  abi: rewardTokenAbi,
  functionName: "allowance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readRewardTokenBalanceOf = /*#__PURE__*/ createReadContract({
  abi: rewardTokenAbi,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const readRewardTokenDecimals = /*#__PURE__*/ createReadContract({
  abi: rewardTokenAbi,
  functionName: "decimals",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"name"`
 */
export const readRewardTokenName = /*#__PURE__*/ createReadContract({
  abi: rewardTokenAbi,
  functionName: "name",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const readRewardTokenSymbol = /*#__PURE__*/ createReadContract({
  abi: rewardTokenAbi,
  functionName: "symbol",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readRewardTokenTotalSupply = /*#__PURE__*/ createReadContract({
  abi: rewardTokenAbi,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link rewardTokenAbi}__
 */
export const writeRewardToken = /*#__PURE__*/ createWriteContract({
  abi: rewardTokenAbi,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"approve"`
 */
export const writeRewardTokenApprove = /*#__PURE__*/ createWriteContract({
  abi: rewardTokenAbi,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const writeRewardTokenTransfer = /*#__PURE__*/ createWriteContract({
  abi: rewardTokenAbi,
  functionName: "transfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeRewardTokenTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: rewardTokenAbi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link rewardTokenAbi}__
 */
export const simulateRewardToken = /*#__PURE__*/ createSimulateContract({
  abi: rewardTokenAbi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"approve"`
 */
export const simulateRewardTokenApprove = /*#__PURE__*/ createSimulateContract({
  abi: rewardTokenAbi,
  functionName: "approve",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateRewardTokenTransfer = /*#__PURE__*/ createSimulateContract(
  { abi: rewardTokenAbi, functionName: "transfer" },
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateRewardTokenTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: rewardTokenAbi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link rewardTokenAbi}__
 */
export const watchRewardTokenEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: rewardTokenAbi,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link rewardTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const watchRewardTokenApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: rewardTokenAbi,
    eventName: "Approval",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link rewardTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchRewardTokenTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: rewardTokenAbi,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const readStakingPool = /*#__PURE__*/ createReadContract({
  abi: stakingPoolAbi,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"balances"`
 */
export const readStakingPoolBalances = /*#__PURE__*/ createReadContract({
  abi: stakingPoolAbi,
  functionName: "balances",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"getBalance"`
 */
export const readStakingPoolGetBalance = /*#__PURE__*/ createReadContract({
  abi: stakingPoolAbi,
  functionName: "getBalance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"getStakedBalance"`
 */
export const readStakingPoolGetStakedBalance = /*#__PURE__*/ createReadContract(
  { abi: stakingPoolAbi, functionName: "getStakedBalance" },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"owner"`
 */
export const readStakingPoolOwner = /*#__PURE__*/ createReadContract({
  abi: stakingPoolAbi,
  functionName: "owner",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"stakers"`
 */
export const readStakingPoolStakers = /*#__PURE__*/ createReadContract({
  abi: stakingPoolAbi,
  functionName: "stakers",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"stakes"`
 */
export const readStakingPoolStakes = /*#__PURE__*/ createReadContract({
  abi: stakingPoolAbi,
  functionName: "stakes",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"totalStakes"`
 */
export const readStakingPoolTotalStakes = /*#__PURE__*/ createReadContract({
  abi: stakingPoolAbi,
  functionName: "totalStakes",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const writeStakingPool = /*#__PURE__*/ createWriteContract({
  abi: stakingPoolAbi,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const writeStakingPoolDeposit = /*#__PURE__*/ createWriteContract({
  abi: stakingPoolAbi,
  functionName: "deposit",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const writeStakingPoolDepositAndStartStake =
  /*#__PURE__*/ createWriteContract({
    abi: stakingPoolAbi,
    functionName: "depositAndStartStake",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const writeStakingPoolEndStake = /*#__PURE__*/ createWriteContract({
  abi: stakingPoolAbi,
  functionName: "endStake",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const writeStakingPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createWriteContract({
    abi: stakingPoolAbi,
    functionName: "endStakeAndWithdraw",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeStakingPoolRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: stakingPoolAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const writeStakingPoolStartStake = /*#__PURE__*/ createWriteContract({
  abi: stakingPoolAbi,
  functionName: "startStake",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeStakingPoolTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: stakingPoolAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeStakingPoolWithdraw = /*#__PURE__*/ createWriteContract({
  abi: stakingPoolAbi,
  functionName: "withdraw",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const simulateStakingPool = /*#__PURE__*/ createSimulateContract({
  abi: stakingPoolAbi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const simulateStakingPoolDeposit = /*#__PURE__*/ createSimulateContract({
  abi: stakingPoolAbi,
  functionName: "deposit",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const simulateStakingPoolDepositAndStartStake =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingPoolAbi,
    functionName: "depositAndStartStake",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const simulateStakingPoolEndStake = /*#__PURE__*/ createSimulateContract(
  { abi: stakingPoolAbi, functionName: "endStake" },
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const simulateStakingPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingPoolAbi,
    functionName: "endStakeAndWithdraw",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateStakingPoolRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingPoolAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const simulateStakingPoolStartStake =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingPoolAbi,
    functionName: "startStake",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateStakingPoolTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingPoolAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateStakingPoolWithdraw = /*#__PURE__*/ createSimulateContract(
  { abi: stakingPoolAbi, functionName: "withdraw" },
);

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const watchStakingPoolEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: stakingPoolAbi,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"Deposited"`
 */
export const watchStakingPoolDepositedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: "Deposited",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchStakingPoolOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"Staked"`
 */
export const watchStakingPoolStakedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: "Staked",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"UnStaked"`
 */
export const watchStakingPoolUnStakedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: "UnStaked",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"Withdrawn"`
 */
export const watchStakingPoolWithdrawnEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: "Withdrawn",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const readStakingRewardPool = /*#__PURE__*/ createReadContract({
  abi: stakingRewardPoolAbi,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"balances"`
 */
export const readStakingRewardPoolBalances = /*#__PURE__*/ createReadContract({
  abi: stakingRewardPoolAbi,
  functionName: "balances",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"claimableReward"`
 */
export const readStakingRewardPoolClaimableReward =
  /*#__PURE__*/ createReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "claimableReward",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getBalance"`
 */
export const readStakingRewardPoolGetBalance = /*#__PURE__*/ createReadContract(
  { abi: stakingRewardPoolAbi, functionName: "getBalance" },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getCurrentRewardPeriodId"`
 */
export const readStakingRewardPoolGetCurrentRewardPeriodId =
  /*#__PURE__*/ createReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "getCurrentRewardPeriodId",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getRewardPeriodsCount"`
 */
export const readStakingRewardPoolGetRewardPeriodsCount =
  /*#__PURE__*/ createReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "getRewardPeriodsCount",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getRewardsStats"`
 */
export const readStakingRewardPoolGetRewardsStats =
  /*#__PURE__*/ createReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "getRewardsStats",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getStakedBalance"`
 */
export const readStakingRewardPoolGetStakedBalance =
  /*#__PURE__*/ createReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "getStakedBalance",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"owner"`
 */
export const readStakingRewardPoolOwner = /*#__PURE__*/ createReadContract({
  abi: stakingRewardPoolAbi,
  functionName: "owner",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"rewardBalance"`
 */
export const readStakingRewardPoolRewardBalance =
  /*#__PURE__*/ createReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "rewardBalance",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"rewardPeriods"`
 */
export const readStakingRewardPoolRewardPeriods =
  /*#__PURE__*/ createReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "rewardPeriods",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"stakers"`
 */
export const readStakingRewardPoolStakers = /*#__PURE__*/ createReadContract({
  abi: stakingRewardPoolAbi,
  functionName: "stakers",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"stakes"`
 */
export const readStakingRewardPoolStakes = /*#__PURE__*/ createReadContract({
  abi: stakingRewardPoolAbi,
  functionName: "stakes",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"totalStakes"`
 */
export const readStakingRewardPoolTotalStakes =
  /*#__PURE__*/ createReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "totalStakes",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const writeStakingRewardPool = /*#__PURE__*/ createWriteContract({
  abi: stakingRewardPoolAbi,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"claimReward"`
 */
export const writeStakingRewardPoolClaimReward =
  /*#__PURE__*/ createWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "claimReward",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deleteRewardPeriod"`
 */
export const writeStakingRewardPoolDeleteRewardPeriod =
  /*#__PURE__*/ createWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "deleteRewardPeriod",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const writeStakingRewardPoolDeposit = /*#__PURE__*/ createWriteContract({
  abi: stakingRewardPoolAbi,
  functionName: "deposit",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const writeStakingRewardPoolDepositAndStartStake =
  /*#__PURE__*/ createWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "depositAndStartStake",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const writeStakingRewardPoolEndStake = /*#__PURE__*/ createWriteContract(
  { abi: stakingRewardPoolAbi, functionName: "endStake" },
);

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const writeStakingRewardPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "endStakeAndWithdraw",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"newRewardPeriod"`
 */
export const writeStakingRewardPoolNewRewardPeriod =
  /*#__PURE__*/ createWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "newRewardPeriod",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeStakingRewardPoolRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const writeStakingRewardPoolStartStake =
  /*#__PURE__*/ createWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "startStake",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeStakingRewardPoolTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeStakingRewardPoolWithdraw = /*#__PURE__*/ createWriteContract(
  { abi: stakingRewardPoolAbi, functionName: "withdraw" },
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const simulateStakingRewardPool = /*#__PURE__*/ createSimulateContract({
  abi: stakingRewardPoolAbi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"claimReward"`
 */
export const simulateStakingRewardPoolClaimReward =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "claimReward",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deleteRewardPeriod"`
 */
export const simulateStakingRewardPoolDeleteRewardPeriod =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "deleteRewardPeriod",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const simulateStakingRewardPoolDeposit =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "deposit",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const simulateStakingRewardPoolDepositAndStartStake =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "depositAndStartStake",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const simulateStakingRewardPoolEndStake =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "endStake",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const simulateStakingRewardPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "endStakeAndWithdraw",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"newRewardPeriod"`
 */
export const simulateStakingRewardPoolNewRewardPeriod =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "newRewardPeriod",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateStakingRewardPoolRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const simulateStakingRewardPoolStartStake =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "startStake",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateStakingRewardPoolTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateStakingRewardPoolWithdraw =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "withdraw",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const watchStakingRewardPoolEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: stakingRewardPoolAbi });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"Deposited"`
 */
export const watchStakingRewardPoolDepositedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "Deposited",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchStakingRewardPoolOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"RewardPaid"`
 */
export const watchStakingRewardPoolRewardPaidEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "RewardPaid",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"Staked"`
 */
export const watchStakingRewardPoolStakedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "Staked",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"UnStaked"`
 */
export const watchStakingRewardPoolUnStakedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "UnStaked",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"Withdrawn"`
 */
export const watchStakingRewardPoolWithdrawnEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "Withdrawn",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const readStakingToken = /*#__PURE__*/ createReadContract({
  abi: stakingTokenAbi,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const readStakingTokenAllowance = /*#__PURE__*/ createReadContract({
  abi: stakingTokenAbi,
  functionName: "allowance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readStakingTokenBalanceOf = /*#__PURE__*/ createReadContract({
  abi: stakingTokenAbi,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const readStakingTokenDecimals = /*#__PURE__*/ createReadContract({
  abi: stakingTokenAbi,
  functionName: "decimals",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"name"`
 */
export const readStakingTokenName = /*#__PURE__*/ createReadContract({
  abi: stakingTokenAbi,
  functionName: "name",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const readStakingTokenSymbol = /*#__PURE__*/ createReadContract({
  abi: stakingTokenAbi,
  functionName: "symbol",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readStakingTokenTotalSupply = /*#__PURE__*/ createReadContract({
  abi: stakingTokenAbi,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const writeStakingToken = /*#__PURE__*/ createWriteContract({
  abi: stakingTokenAbi,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"approve"`
 */
export const writeStakingTokenApprove = /*#__PURE__*/ createWriteContract({
  abi: stakingTokenAbi,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const writeStakingTokenTransfer = /*#__PURE__*/ createWriteContract({
  abi: stakingTokenAbi,
  functionName: "transfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeStakingTokenTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: stakingTokenAbi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const simulateStakingToken = /*#__PURE__*/ createSimulateContract({
  abi: stakingTokenAbi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"approve"`
 */
export const simulateStakingTokenApprove = /*#__PURE__*/ createSimulateContract(
  { abi: stakingTokenAbi, functionName: "approve" },
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateStakingTokenTransfer =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingTokenAbi,
    functionName: "transfer",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateStakingTokenTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingTokenAbi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const watchStakingTokenEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: stakingTokenAbi,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const watchStakingTokenApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingTokenAbi,
    eventName: "Approval",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchStakingTokenTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingTokenAbi,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link walletAbi}__
 */
export const readWallet = /*#__PURE__*/ createReadContract({ abi: walletAbi });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"balances"`
 */
export const readWalletBalances = /*#__PURE__*/ createReadContract({
  abi: walletAbi,
  functionName: "balances",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"getBalance"`
 */
export const readWalletGetBalance = /*#__PURE__*/ createReadContract({
  abi: walletAbi,
  functionName: "getBalance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"owner"`
 */
export const readWalletOwner = /*#__PURE__*/ createReadContract({
  abi: walletAbi,
  functionName: "owner",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link walletAbi}__
 */
export const writeWallet = /*#__PURE__*/ createWriteContract({
  abi: walletAbi,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"deposit"`
 */
export const writeWalletDeposit = /*#__PURE__*/ createWriteContract({
  abi: walletAbi,
  functionName: "deposit",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeWalletRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: walletAbi,
  functionName: "renounceOwnership",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeWalletTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: walletAbi,
  functionName: "transferOwnership",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeWalletWithdraw = /*#__PURE__*/ createWriteContract({
  abi: walletAbi,
  functionName: "withdraw",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link walletAbi}__
 */
export const simulateWallet = /*#__PURE__*/ createSimulateContract({
  abi: walletAbi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"deposit"`
 */
export const simulateWalletDeposit = /*#__PURE__*/ createSimulateContract({
  abi: walletAbi,
  functionName: "deposit",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateWalletRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: walletAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateWalletTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: walletAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateWalletWithdraw = /*#__PURE__*/ createSimulateContract({
  abi: walletAbi,
  functionName: "withdraw",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link walletAbi}__
 */
export const watchWalletEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: walletAbi,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link walletAbi}__ and `eventName` set to `"Deposited"`
 */
export const watchWalletDepositedEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: walletAbi, eventName: "Deposited" },
);

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link walletAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchWalletOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: walletAbi,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link walletAbi}__ and `eventName` set to `"Withdrawn"`
 */
export const watchWalletWithdrawnEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: walletAbi, eventName: "Withdrawn" },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const readErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const readErc20Allowance = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "allowance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc20BalanceOf = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const readErc20Decimals = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "decimals",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const readErc20Name = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "name",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const readErc20Symbol = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "symbol",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readErc20TotalSupply = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const writeErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const writeErc20Approve = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const writeErc20Transfer = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: "transfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeErc20TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const simulateErc20 = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const simulateErc20Approve = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: "approve",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const simulateErc20Transfer = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: "transfer",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateErc20TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const watchErc20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  eventName: "Approval",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchErc20TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  eventName: "Transfer",
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardTokenAbi}__
 */
export const useReadRewardToken = /*#__PURE__*/ createUseReadContract({
  abi: rewardTokenAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadRewardTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: rewardTokenAbi,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadRewardTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: rewardTokenAbi,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadRewardTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: rewardTokenAbi,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadRewardTokenName = /*#__PURE__*/ createUseReadContract({
  abi: rewardTokenAbi,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadRewardTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: rewardTokenAbi,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadRewardTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardTokenAbi,
    functionName: "totalSupply",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardTokenAbi}__
 */
export const useWriteRewardToken = /*#__PURE__*/ createUseWriteContract({
  abi: rewardTokenAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteRewardTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: rewardTokenAbi,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteRewardTokenTransfer = /*#__PURE__*/ createUseWriteContract(
  { abi: rewardTokenAbi, functionName: "transfer" },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteRewardTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardTokenAbi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardTokenAbi}__
 */
export const useSimulateRewardToken = /*#__PURE__*/ createUseSimulateContract({
  abi: rewardTokenAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateRewardTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardTokenAbi,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateRewardTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardTokenAbi,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateRewardTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardTokenAbi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardTokenAbi}__
 */
export const useWatchRewardTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: rewardTokenAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchRewardTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rewardTokenAbi,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchRewardTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rewardTokenAbi,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const useReadStakingPool = /*#__PURE__*/ createUseReadContract({
  abi: stakingPoolAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"balances"`
 */
export const useReadStakingPoolBalances = /*#__PURE__*/ createUseReadContract({
  abi: stakingPoolAbi,
  functionName: "balances",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"getBalance"`
 */
export const useReadStakingPoolGetBalance = /*#__PURE__*/ createUseReadContract(
  { abi: stakingPoolAbi, functionName: "getBalance" },
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"getStakedBalance"`
 */
export const useReadStakingPoolGetStakedBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingPoolAbi,
    functionName: "getStakedBalance",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"owner"`
 */
export const useReadStakingPoolOwner = /*#__PURE__*/ createUseReadContract({
  abi: stakingPoolAbi,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"stakers"`
 */
export const useReadStakingPoolStakers = /*#__PURE__*/ createUseReadContract({
  abi: stakingPoolAbi,
  functionName: "stakers",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"stakes"`
 */
export const useReadStakingPoolStakes = /*#__PURE__*/ createUseReadContract({
  abi: stakingPoolAbi,
  functionName: "stakes",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"totalStakes"`
 */
export const useReadStakingPoolTotalStakes =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingPoolAbi,
    functionName: "totalStakes",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const useWriteStakingPool = /*#__PURE__*/ createUseWriteContract({
  abi: stakingPoolAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteStakingPoolDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: stakingPoolAbi,
  functionName: "deposit",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const useWriteStakingPoolDepositAndStartStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingPoolAbi,
    functionName: "depositAndStartStake",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const useWriteStakingPoolEndStake = /*#__PURE__*/ createUseWriteContract(
  { abi: stakingPoolAbi, functionName: "endStake" },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const useWriteStakingPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingPoolAbi,
    functionName: "endStakeAndWithdraw",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteStakingPoolRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingPoolAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const useWriteStakingPoolStartStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingPoolAbi,
    functionName: "startStake",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteStakingPoolTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingPoolAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteStakingPoolWithdraw = /*#__PURE__*/ createUseWriteContract(
  { abi: stakingPoolAbi, functionName: "withdraw" },
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const useSimulateStakingPool = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingPoolAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateStakingPoolDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: "deposit",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const useSimulateStakingPoolDepositAndStartStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: "depositAndStartStake",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const useSimulateStakingPoolEndStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: "endStake",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const useSimulateStakingPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: "endStakeAndWithdraw",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateStakingPoolRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const useSimulateStakingPoolStartStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: "startStake",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateStakingPoolTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateStakingPoolWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: "withdraw",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const useWatchStakingPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: stakingPoolAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"Deposited"`
 */
export const useWatchStakingPoolDepositedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: "Deposited",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchStakingPoolOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"Staked"`
 */
export const useWatchStakingPoolStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: "Staked",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"UnStaked"`
 */
export const useWatchStakingPoolUnStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: "UnStaked",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"Withdrawn"`
 */
export const useWatchStakingPoolWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: "Withdrawn",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const useReadStakingRewardPool = /*#__PURE__*/ createUseReadContract({
  abi: stakingRewardPoolAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"balances"`
 */
export const useReadStakingRewardPoolBalances =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "balances",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"claimableReward"`
 */
export const useReadStakingRewardPoolClaimableReward =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "claimableReward",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getBalance"`
 */
export const useReadStakingRewardPoolGetBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "getBalance",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getCurrentRewardPeriodId"`
 */
export const useReadStakingRewardPoolGetCurrentRewardPeriodId =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "getCurrentRewardPeriodId",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getRewardPeriodsCount"`
 */
export const useReadStakingRewardPoolGetRewardPeriodsCount =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "getRewardPeriodsCount",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getRewardsStats"`
 */
export const useReadStakingRewardPoolGetRewardsStats =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "getRewardsStats",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getStakedBalance"`
 */
export const useReadStakingRewardPoolGetStakedBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "getStakedBalance",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"owner"`
 */
export const useReadStakingRewardPoolOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "owner",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"rewardBalance"`
 */
export const useReadStakingRewardPoolRewardBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "rewardBalance",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"rewardPeriods"`
 */
export const useReadStakingRewardPoolRewardPeriods =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "rewardPeriods",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"stakers"`
 */
export const useReadStakingRewardPoolStakers =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "stakers",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"stakes"`
 */
export const useReadStakingRewardPoolStakes =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "stakes",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"totalStakes"`
 */
export const useReadStakingRewardPoolTotalStakes =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: "totalStakes",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const useWriteStakingRewardPool = /*#__PURE__*/ createUseWriteContract({
  abi: stakingRewardPoolAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"claimReward"`
 */
export const useWriteStakingRewardPoolClaimReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "claimReward",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deleteRewardPeriod"`
 */
export const useWriteStakingRewardPoolDeleteRewardPeriod =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "deleteRewardPeriod",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteStakingRewardPoolDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "deposit",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const useWriteStakingRewardPoolDepositAndStartStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "depositAndStartStake",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const useWriteStakingRewardPoolEndStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "endStake",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const useWriteStakingRewardPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "endStakeAndWithdraw",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"newRewardPeriod"`
 */
export const useWriteStakingRewardPoolNewRewardPeriod =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "newRewardPeriod",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteStakingRewardPoolRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const useWriteStakingRewardPoolStartStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "startStake",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteStakingRewardPoolTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteStakingRewardPoolWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: "withdraw",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const useSimulateStakingRewardPool =
  /*#__PURE__*/ createUseSimulateContract({ abi: stakingRewardPoolAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"claimReward"`
 */
export const useSimulateStakingRewardPoolClaimReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "claimReward",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deleteRewardPeriod"`
 */
export const useSimulateStakingRewardPoolDeleteRewardPeriod =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "deleteRewardPeriod",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateStakingRewardPoolDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "deposit",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const useSimulateStakingRewardPoolDepositAndStartStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "depositAndStartStake",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const useSimulateStakingRewardPoolEndStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "endStake",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const useSimulateStakingRewardPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "endStakeAndWithdraw",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"newRewardPeriod"`
 */
export const useSimulateStakingRewardPoolNewRewardPeriod =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "newRewardPeriod",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateStakingRewardPoolRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const useSimulateStakingRewardPoolStartStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "startStake",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateStakingRewardPoolTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateStakingRewardPoolWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: "withdraw",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const useWatchStakingRewardPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: stakingRewardPoolAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"Deposited"`
 */
export const useWatchStakingRewardPoolDepositedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "Deposited",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchStakingRewardPoolOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"RewardPaid"`
 */
export const useWatchStakingRewardPoolRewardPaidEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "RewardPaid",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"Staked"`
 */
export const useWatchStakingRewardPoolStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "Staked",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"UnStaked"`
 */
export const useWatchStakingRewardPoolUnStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "UnStaked",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"Withdrawn"`
 */
export const useWatchStakingRewardPoolWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: "Withdrawn",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const useReadStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: stakingTokenAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadStakingTokenAllowance = /*#__PURE__*/ createUseReadContract(
  { abi: stakingTokenAbi, functionName: "allowance" },
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadStakingTokenBalanceOf = /*#__PURE__*/ createUseReadContract(
  { abi: stakingTokenAbi, functionName: "balanceOf" },
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadStakingTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: stakingTokenAbi,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadStakingTokenName = /*#__PURE__*/ createUseReadContract({
  abi: stakingTokenAbi,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadStakingTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: stakingTokenAbi,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadStakingTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingTokenAbi,
    functionName: "totalSupply",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const useWriteStakingToken = /*#__PURE__*/ createUseWriteContract({
  abi: stakingTokenAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteStakingTokenApprove = /*#__PURE__*/ createUseWriteContract(
  { abi: stakingTokenAbi, functionName: "approve" },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteStakingTokenTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingTokenAbi,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteStakingTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingTokenAbi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const useSimulateStakingToken = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingTokenAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateStakingTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingTokenAbi,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateStakingTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingTokenAbi,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateStakingTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingTokenAbi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingTokenAbi}__
 */
export const useWatchStakingTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: stakingTokenAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchStakingTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingTokenAbi,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchStakingTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingTokenAbi,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link walletAbi}__
 */
export const useReadWallet = /*#__PURE__*/ createUseReadContract({
  abi: walletAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"balances"`
 */
export const useReadWalletBalances = /*#__PURE__*/ createUseReadContract({
  abi: walletAbi,
  functionName: "balances",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"getBalance"`
 */
export const useReadWalletGetBalance = /*#__PURE__*/ createUseReadContract({
  abi: walletAbi,
  functionName: "getBalance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"owner"`
 */
export const useReadWalletOwner = /*#__PURE__*/ createUseReadContract({
  abi: walletAbi,
  functionName: "owner",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link walletAbi}__
 */
export const useWriteWallet = /*#__PURE__*/ createUseWriteContract({
  abi: walletAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteWalletDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: walletAbi,
  functionName: "deposit",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteWalletRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: walletAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteWalletTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: walletAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteWalletWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: walletAbi,
  functionName: "withdraw",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link walletAbi}__
 */
export const useSimulateWallet = /*#__PURE__*/ createUseSimulateContract({
  abi: walletAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateWalletDeposit = /*#__PURE__*/ createUseSimulateContract(
  { abi: walletAbi, functionName: "deposit" },
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateWalletRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: walletAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateWalletTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: walletAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateWalletWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: walletAbi,
    functionName: "withdraw",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link walletAbi}__
 */
export const useWatchWalletEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: walletAbi,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link walletAbi}__ and `eventName` set to `"Deposited"`
 */
export const useWatchWalletDepositedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: walletAbi,
    eventName: "Deposited",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link walletAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchWalletOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: walletAbi,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link walletAbi}__ and `eventName` set to `"Withdrawn"`
 */
export const useWatchWalletWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: walletAbi,
    eventName: "Withdrawn",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: "transfer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: "approve",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: "transfer" },
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: "Transfer",
  });
