// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StakingPool.sol";

/**
 * Pool contract to distribute reward tokens among LP token stakers proportionally to the amount and duration of the their stakes.
 * The owner can setup multiple reward periods each one with a pre-allocated amount of reward tokens to be distributed.
 * Users are free to add and remove tokens to their stake at any time.
 * Users can also claim their pending reward at any time.

 * The pool implements an efficient O(1) algo to distribute the rewards based on this paper:
 * https://uploads-ssl.webflow.com/5ad71ffeb79acc67c8bcdaba/5ad8d1193a40977462982470_scalable-reward-distribution-paper.pdf
 */
contract StakingRewardPool is StakingPool {
    event RewardPaid(address indexed user, uint256 reward);

    struct RewardPeriod {
        uint id;
        uint reward;
        uint from;
        uint to;
        uint lastUpdated; // when the totalStakedWeight was last updated (after last stake was ended)
        uint totalStaked; // T: sum of all active stake deposits
        uint rewardPerTokenStaked; // S: SUM(reward/T) - sum of all rewards distributed divided all active stakes
        uint totalRewardsPaid;
    }

    struct UserInfo {
        uint userRewardPerTokenStaked;
        uint pendingRewards;
        uint rewardsPaid;
    }

    struct RewardsStats {
        // user stats
        uint claimableRewards;
        uint rewardsPaid;
        // general stats
        uint rewardRate;
        uint totalRewardsPaid;
    }

    IERC20 internal rewardToken;
    RewardPeriod[] _rewardPeriods;
    uint rewardPeriodsCount = 0;

    function rewardPeriods(uint index) public view returns (RewardPeriod memory) {
        return _rewardPeriods[index];
    }

    mapping(address => UserInfo) userInfos;

    // mapping(address => uint) userRewardPerTokenStaked;
    // mapping (address => uint) pendingRewards;

    uint constant rewardPrecision = 1e9;

    constructor(
        address _rewardTokenAddress,
        address _lpTokenAddress
    ) StakingPool(_rewardTokenAddress, _lpTokenAddress) {
        rewardToken = IERC20(_rewardTokenAddress);
    }

    function newRewardPeriod(uint reward, uint from, uint to) public onlyOwner {
        require(reward > 0, "Invalid reward period amount");
        require(to > from && to > block.timestamp, "Invalid reward period interval");
        require(
            _rewardPeriods.length == 0 || from > _rewardPeriods[_rewardPeriods.length - 1].to,
            "Invalid period start time"
        );

        _rewardPeriods.push(
            RewardPeriod({
                id: _rewardPeriods.length + 1,
                reward: reward,
                from: from,
                to: to,
                lastUpdated: block.timestamp,
                totalStaked: 0,
                rewardPerTokenStaked: 0,
                totalRewardsPaid: 0
            })
        );
        rewardPeriodsCount = _rewardPeriods.length;
        depositReward(reward);
    }

    function getRewardPeriodsCount() public view returns (uint) {
        return rewardPeriodsCount;
    }

    function deleteRewardPeriod(uint index) public onlyOwner {
        require(_rewardPeriods.length > index, "Invalid reward phase index");
        for (uint i = index; i < _rewardPeriods.length - 1; i++) {
            _rewardPeriods[i] = _rewardPeriods[i + 1];
        }
        _rewardPeriods.pop();
        rewardPeriodsCount = _rewardPeriods.length;
    }

    function rewardBalance() public view returns (uint) {
        return rewardToken.balanceOf(address(this));
    }

    // Deposit reward token into this contract
    function depositReward(uint amount) internal onlyOwner {
        rewardToken.transferFrom(msg.sender, address(this), amount);
    }

    function startStake(uint amount) public override {
        uint periodId = getCurrentRewardPeriodId();
        require(periodId > 0, "No active reward period found");
        update();

        super.startStake(amount);

        // update total tokens staked
        RewardPeriod storage period = _rewardPeriods[periodId - 1];
        period.totalStaked += amount;
    }

    function endStake(uint amount) public override {
        update();
        super.endStake(amount);

        // update total tokens staked
        uint periodId = getCurrentRewardPeriodId();
        RewardPeriod storage period = _rewardPeriods[periodId - 1];
        period.totalStaked -= amount;

        claim();
    }

    function claimableReward() public view returns (uint) {
        uint periodId = getCurrentRewardPeriodId();
        if (periodId == 0) return 0;

        RewardPeriod memory period = _rewardPeriods[periodId - 1];
        uint newRewardDistribution = calculateRewardDistribution(period);
        uint reward = calculateReward(newRewardDistribution);

        UserInfo memory userInfo = userInfos[msg.sender];
        uint pending = userInfo.pendingRewards;

        return pending + reward;
    }

    function claimReward() public {
        update();
        claim();
    }

    function claim() internal {
        UserInfo storage userInfo = userInfos[msg.sender];
        uint rewards = userInfo.pendingRewards;
        if (rewards != 0) {
            userInfo.pendingRewards = 0;

            uint periodId = getCurrentRewardPeriodId();
            RewardPeriod storage period = _rewardPeriods[periodId - 1];
            period.totalRewardsPaid += rewards;

            payReward(msg.sender, rewards);
        }
    }

    function getCurrentRewardPeriodId() public view returns (uint) {
        if (rewardPeriodsCount == 0) return 0;
        for (uint i = _rewardPeriods.length; i > 0; i--) {
            RewardPeriod memory period = _rewardPeriods[i - 1];
            if (period.from <= block.timestamp && period.to >= block.timestamp) {
                return period.id;
            }
        }
        return 0;
    }

    function getRewardsStats() public view returns (RewardsStats memory) {
        UserInfo memory userInfo = userInfos[msg.sender];

        RewardsStats memory stats = RewardsStats({
            claimableRewards: 0,
            rewardsPaid: 0,
            rewardRate: 0,
            totalRewardsPaid: 0
        });

        // user stats
        stats.claimableRewards = claimableReward();
        stats.rewardsPaid = userInfo.rewardsPaid;

        // reward period stats
        uint periodId = getCurrentRewardPeriodId();
        if (periodId > 0) {
            RewardPeriod memory period = _rewardPeriods[periodId - 1];
            stats.rewardRate = rewardRate(period);
            stats.totalRewardsPaid = period.totalRewardsPaid;
        }

        return stats;
    }

    function rewardRate(RewardPeriod memory period) internal pure returns (uint) {
        uint duration = period.to - period.from;
        return period.reward / duration;
    }

    function payReward(address account, uint reward) internal {
        UserInfo storage userInfo = userInfos[msg.sender];
        userInfo.rewardsPaid += reward;
        rewardToken.transfer(account, reward);

        emit RewardPaid(account, reward);
    }

    /// Reward calcualtion logic

    function update() internal {
        uint periodId = getCurrentRewardPeriodId();
        require(periodId > 0, "No active reward period found");

        RewardPeriod storage period = _rewardPeriods[periodId - 1];
        uint rewardDistribuedPerToken = calculateRewardDistribution(period);

        // update pending rewards reward since rewardPerTokenStaked was updated
        uint reward = calculateReward(rewardDistribuedPerToken);
        UserInfo storage userInfo = userInfos[msg.sender];
        userInfo.pendingRewards += reward;
        userInfo.userRewardPerTokenStaked = rewardDistribuedPerToken;

        require(
            rewardDistribuedPerToken >= period.rewardPerTokenStaked,
            "Reward distribution should be monotonic increasing"
        );

        period.rewardPerTokenStaked = rewardDistribuedPerToken;
        period.lastUpdated = block.timestamp;
    }

    function calculateRewardDistribution(RewardPeriod memory period) internal view returns (uint) {
        // calculate total reward to be distributed since period.lastUpdated
        uint rate = rewardRate(period);
        uint deltaTime = block.timestamp - period.lastUpdated;
        uint reward = deltaTime * rate;

        uint newRewardPerTokenStaked = period.rewardPerTokenStaked; // 0
        if (period.totalStaked != 0) {
            // S = S + r / T
            newRewardPerTokenStaked += (reward * rewardPrecision) / period.totalStaked;
        }

        return newRewardPerTokenStaked;
    }

    function calculateReward(uint rewardDistribution) internal view returns (uint) {
        if (rewardDistribution == 0) return 0;

        uint staked = stakes[msg.sender];
        UserInfo memory userInfo = userInfos[msg.sender];
        uint reward = (staked * (rewardDistribution - userInfo.userRewardPerTokenStaked)) / rewardPrecision;

        return reward;
    }
}
