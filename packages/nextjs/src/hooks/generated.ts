import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CakeLP
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cakeLpAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ETB
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const etbAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Migrations
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const migrationsAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'last_completed_migration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'completed', internalType: 'uint256', type: 'uint256' }],
    name: 'setCompleted',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StakingPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakingPoolAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '_lpTokenAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Staked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UnStaked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawn',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balances',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'depositAndStartStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'endStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'endStakeAndWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getStakedBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'stakers',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'stakes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'startStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalStakes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StakingRewardPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakingRewardPoolAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_rewardTokenAddress', internalType: 'address', type: 'address' },
      { name: '_lpTokenAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'reward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardPaid',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Staked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UnStaked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawn',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balances',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimableReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'deleteRewardPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'depositAndStartStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'endStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'endStakeAndWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentRewardPeriodId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRewardPeriodsCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRewardsStats',
    outputs: [
      {
        name: '',
        internalType: 'struct StakingRewardPool.RewardsStats',
        type: 'tuple',
        components: [
          {
            name: 'claimableRewards',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'rewardsPaid', internalType: 'uint256', type: 'uint256' },
          { name: 'rewardRate', internalType: 'uint256', type: 'uint256' },
          {
            name: 'totalRewardsPaid',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getStakedBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'reward', internalType: 'uint256', type: 'uint256' },
      { name: 'from', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'newRewardPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'rewardPeriods',
    outputs: [
      {
        name: '',
        internalType: 'struct StakingRewardPool.RewardPeriod',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'reward', internalType: 'uint256', type: 'uint256' },
          { name: 'from', internalType: 'uint256', type: 'uint256' },
          { name: 'to', internalType: 'uint256', type: 'uint256' },
          { name: 'lastUpdated', internalType: 'uint256', type: 'uint256' },
          { name: 'totalStaked', internalType: 'uint256', type: 'uint256' },
          {
            name: 'rewardPerTokenStaked',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalRewardsPaid',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'stakers',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'stakes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'startStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalStakes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Wallet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const walletAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'token_', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawn',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balances',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cakeLpAbi}__
 */
export const useReadCakeLp = /*#__PURE__*/ createUseReadContract({
  abi: cakeLpAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadCakeLpAllowance = /*#__PURE__*/ createUseReadContract({
  abi: cakeLpAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadCakeLpBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: cakeLpAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadCakeLpDecimals = /*#__PURE__*/ createUseReadContract({
  abi: cakeLpAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"name"`
 */
export const useReadCakeLpName = /*#__PURE__*/ createUseReadContract({
  abi: cakeLpAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadCakeLpSymbol = /*#__PURE__*/ createUseReadContract({
  abi: cakeLpAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadCakeLpTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: cakeLpAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cakeLpAbi}__
 */
export const useWriteCakeLp = /*#__PURE__*/ createUseWriteContract({
  abi: cakeLpAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteCakeLpApprove = /*#__PURE__*/ createUseWriteContract({
  abi: cakeLpAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteCakeLpTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: cakeLpAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteCakeLpTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: cakeLpAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cakeLpAbi}__
 */
export const useSimulateCakeLp = /*#__PURE__*/ createUseSimulateContract({
  abi: cakeLpAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateCakeLpApprove = /*#__PURE__*/ createUseSimulateContract(
  { abi: cakeLpAbi, functionName: 'approve' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateCakeLpTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cakeLpAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link cakeLpAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateCakeLpTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: cakeLpAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cakeLpAbi}__
 */
export const useWatchCakeLpEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: cakeLpAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cakeLpAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchCakeLpApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cakeLpAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link cakeLpAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchCakeLpTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: cakeLpAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link etbAbi}__
 */
export const useReadEtb = /*#__PURE__*/ createUseReadContract({ abi: etbAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadEtbAllowance = /*#__PURE__*/ createUseReadContract({
  abi: etbAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadEtbBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: etbAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadEtbDecimals = /*#__PURE__*/ createUseReadContract({
  abi: etbAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"name"`
 */
export const useReadEtbName = /*#__PURE__*/ createUseReadContract({
  abi: etbAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadEtbSymbol = /*#__PURE__*/ createUseReadContract({
  abi: etbAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadEtbTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: etbAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link etbAbi}__
 */
export const useWriteEtb = /*#__PURE__*/ createUseWriteContract({ abi: etbAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteEtbApprove = /*#__PURE__*/ createUseWriteContract({
  abi: etbAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteEtbTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: etbAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteEtbTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: etbAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link etbAbi}__
 */
export const useSimulateEtb = /*#__PURE__*/ createUseSimulateContract({
  abi: etbAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateEtbApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: etbAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateEtbTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: etbAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link etbAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateEtbTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: etbAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link etbAbi}__
 */
export const useWatchEtbEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: etbAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link etbAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchEtbApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: etbAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link etbAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchEtbTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: etbAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link migrationsAbi}__
 */
export const useReadMigrations = /*#__PURE__*/ createUseReadContract({
  abi: migrationsAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link migrationsAbi}__ and `functionName` set to `"last_completed_migration"`
 */
export const useReadMigrationsLastCompletedMigration =
  /*#__PURE__*/ createUseReadContract({
    abi: migrationsAbi,
    functionName: 'last_completed_migration',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link migrationsAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMigrationsOwner = /*#__PURE__*/ createUseReadContract({
  abi: migrationsAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link migrationsAbi}__
 */
export const useWriteMigrations = /*#__PURE__*/ createUseWriteContract({
  abi: migrationsAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link migrationsAbi}__ and `functionName` set to `"setCompleted"`
 */
export const useWriteMigrationsSetCompleted =
  /*#__PURE__*/ createUseWriteContract({
    abi: migrationsAbi,
    functionName: 'setCompleted',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link migrationsAbi}__
 */
export const useSimulateMigrations = /*#__PURE__*/ createUseSimulateContract({
  abi: migrationsAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link migrationsAbi}__ and `functionName` set to `"setCompleted"`
 */
export const useSimulateMigrationsSetCompleted =
  /*#__PURE__*/ createUseSimulateContract({
    abi: migrationsAbi,
    functionName: 'setCompleted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const useReadStakingPool = /*#__PURE__*/ createUseReadContract({
  abi: stakingPoolAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"balances"`
 */
export const useReadStakingPoolBalances = /*#__PURE__*/ createUseReadContract({
  abi: stakingPoolAbi,
  functionName: 'balances',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"getBalance"`
 */
export const useReadStakingPoolGetBalance = /*#__PURE__*/ createUseReadContract(
  { abi: stakingPoolAbi, functionName: 'getBalance' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"getStakedBalance"`
 */
export const useReadStakingPoolGetStakedBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingPoolAbi,
    functionName: 'getStakedBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"owner"`
 */
export const useReadStakingPoolOwner = /*#__PURE__*/ createUseReadContract({
  abi: stakingPoolAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"stakers"`
 */
export const useReadStakingPoolStakers = /*#__PURE__*/ createUseReadContract({
  abi: stakingPoolAbi,
  functionName: 'stakers',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"stakes"`
 */
export const useReadStakingPoolStakes = /*#__PURE__*/ createUseReadContract({
  abi: stakingPoolAbi,
  functionName: 'stakes',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"totalStakes"`
 */
export const useReadStakingPoolTotalStakes =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingPoolAbi,
    functionName: 'totalStakes',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const useWriteStakingPool = /*#__PURE__*/ createUseWriteContract({
  abi: stakingPoolAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteStakingPoolDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: stakingPoolAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const useWriteStakingPoolDepositAndStartStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingPoolAbi,
    functionName: 'depositAndStartStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const useWriteStakingPoolEndStake = /*#__PURE__*/ createUseWriteContract(
  { abi: stakingPoolAbi, functionName: 'endStake' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const useWriteStakingPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingPoolAbi,
    functionName: 'endStakeAndWithdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteStakingPoolRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingPoolAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const useWriteStakingPoolStartStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingPoolAbi,
    functionName: 'startStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteStakingPoolTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingPoolAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteStakingPoolWithdraw = /*#__PURE__*/ createUseWriteContract(
  { abi: stakingPoolAbi, functionName: 'withdraw' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const useSimulateStakingPool = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingPoolAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateStakingPoolDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const useSimulateStakingPoolDepositAndStartStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: 'depositAndStartStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const useSimulateStakingPoolEndStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: 'endStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const useSimulateStakingPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: 'endStakeAndWithdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateStakingPoolRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const useSimulateStakingPoolStartStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: 'startStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateStakingPoolTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateStakingPoolWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingPoolAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__
 */
export const useWatchStakingPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: stakingPoolAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"Deposited"`
 */
export const useWatchStakingPoolDepositedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: 'Deposited',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchStakingPoolOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"Staked"`
 */
export const useWatchStakingPoolStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: 'Staked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"UnStaked"`
 */
export const useWatchStakingPoolUnStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: 'UnStaked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingPoolAbi}__ and `eventName` set to `"Withdrawn"`
 */
export const useWatchStakingPoolWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingPoolAbi,
    eventName: 'Withdrawn',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const useReadStakingRewardPool = /*#__PURE__*/ createUseReadContract({
  abi: stakingRewardPoolAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"balances"`
 */
export const useReadStakingRewardPoolBalances =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'balances',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"claimableReward"`
 */
export const useReadStakingRewardPoolClaimableReward =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'claimableReward',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getBalance"`
 */
export const useReadStakingRewardPoolGetBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'getBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getCurrentRewardPeriodId"`
 */
export const useReadStakingRewardPoolGetCurrentRewardPeriodId =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'getCurrentRewardPeriodId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getRewardPeriodsCount"`
 */
export const useReadStakingRewardPoolGetRewardPeriodsCount =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'getRewardPeriodsCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getRewardsStats"`
 */
export const useReadStakingRewardPoolGetRewardsStats =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'getRewardsStats',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"getStakedBalance"`
 */
export const useReadStakingRewardPoolGetStakedBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'getStakedBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"owner"`
 */
export const useReadStakingRewardPoolOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"rewardBalance"`
 */
export const useReadStakingRewardPoolRewardBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'rewardBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"rewardPeriods"`
 */
export const useReadStakingRewardPoolRewardPeriods =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'rewardPeriods',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"stakers"`
 */
export const useReadStakingRewardPoolStakers =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'stakers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"stakes"`
 */
export const useReadStakingRewardPoolStakes =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'stakes',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"totalStakes"`
 */
export const useReadStakingRewardPoolTotalStakes =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardPoolAbi,
    functionName: 'totalStakes',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const useWriteStakingRewardPool = /*#__PURE__*/ createUseWriteContract({
  abi: stakingRewardPoolAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"claimReward"`
 */
export const useWriteStakingRewardPoolClaimReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deleteRewardPeriod"`
 */
export const useWriteStakingRewardPoolDeleteRewardPeriod =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: 'deleteRewardPeriod',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteStakingRewardPoolDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const useWriteStakingRewardPoolDepositAndStartStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: 'depositAndStartStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const useWriteStakingRewardPoolEndStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: 'endStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const useWriteStakingRewardPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: 'endStakeAndWithdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"newRewardPeriod"`
 */
export const useWriteStakingRewardPoolNewRewardPeriod =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: 'newRewardPeriod',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteStakingRewardPoolRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const useWriteStakingRewardPoolStartStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: 'startStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteStakingRewardPoolTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteStakingRewardPoolWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardPoolAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const useSimulateStakingRewardPool =
  /*#__PURE__*/ createUseSimulateContract({ abi: stakingRewardPoolAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"claimReward"`
 */
export const useSimulateStakingRewardPoolClaimReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: 'claimReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deleteRewardPeriod"`
 */
export const useSimulateStakingRewardPoolDeleteRewardPeriod =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: 'deleteRewardPeriod',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateStakingRewardPoolDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"depositAndStartStake"`
 */
export const useSimulateStakingRewardPoolDepositAndStartStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: 'depositAndStartStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStake"`
 */
export const useSimulateStakingRewardPoolEndStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: 'endStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"endStakeAndWithdraw"`
 */
export const useSimulateStakingRewardPoolEndStakeAndWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: 'endStakeAndWithdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"newRewardPeriod"`
 */
export const useSimulateStakingRewardPoolNewRewardPeriod =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: 'newRewardPeriod',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateStakingRewardPoolRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"startStake"`
 */
export const useSimulateStakingRewardPoolStartStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: 'startStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateStakingRewardPoolTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateStakingRewardPoolWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardPoolAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__
 */
export const useWatchStakingRewardPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: stakingRewardPoolAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"Deposited"`
 */
export const useWatchStakingRewardPoolDepositedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: 'Deposited',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchStakingRewardPoolOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"RewardPaid"`
 */
export const useWatchStakingRewardPoolRewardPaidEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: 'RewardPaid',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"Staked"`
 */
export const useWatchStakingRewardPoolStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: 'Staked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"UnStaked"`
 */
export const useWatchStakingRewardPoolUnStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: 'UnStaked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardPoolAbi}__ and `eventName` set to `"Withdrawn"`
 */
export const useWatchStakingRewardPoolWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardPoolAbi,
    eventName: 'Withdrawn',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link walletAbi}__
 */
export const useReadWallet = /*#__PURE__*/ createUseReadContract({
  abi: walletAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"balances"`
 */
export const useReadWalletBalances = /*#__PURE__*/ createUseReadContract({
  abi: walletAbi,
  functionName: 'balances',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"getBalance"`
 */
export const useReadWalletGetBalance = /*#__PURE__*/ createUseReadContract({
  abi: walletAbi,
  functionName: 'getBalance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"owner"`
 */
export const useReadWalletOwner = /*#__PURE__*/ createUseReadContract({
  abi: walletAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link walletAbi}__
 */
export const useWriteWallet = /*#__PURE__*/ createUseWriteContract({
  abi: walletAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteWalletDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: walletAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteWalletRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: walletAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteWalletTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: walletAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteWalletWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: walletAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link walletAbi}__
 */
export const useSimulateWallet = /*#__PURE__*/ createUseSimulateContract({
  abi: walletAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateWalletDeposit = /*#__PURE__*/ createUseSimulateContract(
  { abi: walletAbi, functionName: 'deposit' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateWalletRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: walletAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateWalletTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: walletAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link walletAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateWalletWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: walletAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link walletAbi}__
 */
export const useWatchWalletEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: walletAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link walletAbi}__ and `eventName` set to `"Deposited"`
 */
export const useWatchWalletDepositedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: walletAbi,
    eventName: 'Deposited',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link walletAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchWalletOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: walletAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link walletAbi}__ and `eventName` set to `"Withdrawn"`
 */
export const useWatchWalletWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: walletAbi,
    eventName: 'Withdrawn',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })
