import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { assert, expect } from "chai";
import hre, { ethers } from "hardhat";

describe("StakingRewardPool", () => {
  async function fixture() {
    const accounts = await ethers.getSigners();

    const rewardToken = await hre.ethers.deployContract("ETB");
    const stakingToken = await hre.ethers.deployContract("CakeLP");

    const POOL = await hre.ethers.getContractFactory("StakingRewardPool");
    const pool = await POOL.deploy(rewardToken.target, stakingToken.target);
    await pool.waitForDeployment();

    await stakingToken
      .connect(accounts[0])
      .transfer(accounts[1].address, 10000n);

    await stakingToken
      .connect(accounts[0])
      .transfer(accounts[2].address, 10000n);

    return { pool, stakingToken, rewardToken, accounts };
  }

  it("starting a new reward phase should setup the reward phase and reward token balance in the pool", async () => {
    const { pool, rewardToken } = await loadFixture(fixture);

    let balance = await pool.rewardBalance();
    assert.equal(balance, 0n, "Invalid reward token balance");

    // reward phase
    let reward = 100n;

    let latestBlock = await time.latest();
    let start = BigInt(latestBlock);
    let end = start + BigInt(7 * 24 * 60 * 60);

    // approve reward transfer
    await rewardToken.approve(pool.target, reward);

    // start a new reward phase
    await pool.newRewardPeriod(reward, start, end);
    let count = await pool.getRewardPeriodsCount();
    let phase = await pool.rewardPeriods(count - 1n);

    // verify reward phase data
    assert.equal(phase.from, start, "Invalid reward phase start");
    assert.equal(phase.to, end, "Invalid reward phase end");
    assert.equal(phase.reward, reward, "Invalid reward phase amount");

    // verify reward balance
    let balanceAfter = await pool.rewardBalance();
    assert.equal(
      balanceAfter,
      reward,
      "Invalid reward token balance after deposit",
    );
  });

  it("claimableReward should return the reward yet to be claimed ", async () => {
    const { pool, rewardToken, stakingToken, accounts } =
      await loadFixture(fixture);

    // deposit LP tokens to stake
    let stakeAmount = 10;
    await stakingToken.connect(accounts[1]).approve(pool.target, stakeAmount);
    await pool.connect(accounts[1]).deposit(stakeAmount);

    // start a new reward phase
    let period = 1000n;
    let rewardRate = 2n;
    let periodReward = rewardRate * period;

    await rewardToken.approve(pool.target, periodReward);

    let start = BigInt(await time.latest());
    let end = start + period;

    await pool.newRewardPeriod(periodReward, start, end);

    // stake LP tokens
    await pool.connect(accounts[1]).startStake(stakeAmount);

    // wait
    let t0 = BigInt(await time.latest());
    await time.increase(200);
    let t1 = BigInt(await time.latest());

    // get stake reward so far
    let stakeReward1 = await pool.connect(accounts[1]).claimableReward();
    let stakePeriod1 = t1 - t0;
    let expectedReward1 = rewardRate * stakePeriod1;
    assert.equal(stakeReward1, expectedReward1, "Invalid stake reward amount");

    // wait some moore
    await time.increase(100); // Stake 2 period
    let t2 = BigInt(await time.latest());

    // get stake reward so far
    let stakeReward2 = await pool.connect(accounts[1]).claimableReward();
    let stakePeriod2 = t2 - t0;
    let expectedReward2 = rewardRate * stakePeriod2;
    assert.equal(stakeReward2, expectedReward2, "Invalid stake reward amount");
  });

  it("The reward for 1 stake across the full reward phase should equal the full reward", async () => {
    const { pool, rewardToken, stakingToken, accounts } =
      await loadFixture(fixture);

    // deposit LP tokens to stake
    let stakeAmount = 10n;
    await stakingToken.connect(accounts[1]).approve(pool.target, stakeAmount);
    await pool.connect(accounts[1]).deposit(stakeAmount);

    // start a new reward phase of 1 week.
    // reward: 5 tokens per per second for 7 days => 3,024,000 tokens
    let day = 24 * 60 * 60;
    let week = 7 * day;
    let reward = 5 * week;

    await rewardToken.approve(pool.target, reward);

    // Start slightly in the future so user can deposit at the start
    let start = (await time.latest()) + 2;
    let end = start + week;

    await pool.newRewardPeriod(reward, start, end);

    // stake LP tokens at very start
    await time.setNextBlockTimestamp(start);
    await pool.connect(accounts[1]).startStake(stakeAmount);

    // wait 7 days, and end stake
    await time.setNextBlockTimestamp(end);
    await pool.connect(accounts[1]).endStake(stakeAmount);

    assert.equal(
      await rewardToken.balanceOf(accounts[1].address),
      BigInt(reward),
      "Reward earned should equal the contract reward for this phase",
    );
  });

  it("The reward for a single stake should be the total reward distributed during the stake interval", async () => {
    const { pool, rewardToken, stakingToken, accounts } =
      await loadFixture(fixture);

    // deposit LP tokens to stake
    let stakeAmount = 10;
    await stakingToken.connect(accounts[1]).approve(pool.target, stakeAmount);
    await pool.connect(accounts[1]).deposit(stakeAmount);

    // start a new reward phase of 1000 seconds
    // reward: 2 tokens per per second for 1000 days => 2,000 tokens
    let period = 1000n;
    let rewardRate = 2n;
    let reward = rewardRate * period;

    await rewardToken.approve(pool.target, reward);

    let start = await time.latest();
    let end = start + Number(period);

    await pool.newRewardPeriod(reward, start, end);

    let rewardBalanceBefore = await rewardToken.balanceOf(accounts[1].address);

    // wait
    await time.increase(500);

    // stake LP tokens
    await pool.connect(accounts[1]).startStake(stakeAmount);
    let t0 = await time.latest();

    // wait
    await time.increase(200);

    // end stake
    await pool.connect(accounts[1]).endStake(stakeAmount);
    let t1 = await time.latest();

    // verify reward earned
    let rewardBalanceAfter = await rewardToken.balanceOf(accounts[1].address);
    let rewardEarned = rewardBalanceAfter - rewardBalanceBefore;
    let stakeInterval = t1 - t0;
    let expectedReward = rewardRate * BigInt(stakeInterval);

    assert.equal(rewardEarned, expectedReward, "Incorrect reward earned");
  });

  it("The reward of 2 overlapping stakes should be proportional to the amount of tokens staked", async () => {
    const { pool, rewardToken, stakingToken, accounts } =
      await loadFixture(fixture);

    // deposit LP tokens
    let stake1Amount = 10n;
    await stakingToken.connect(accounts[1]).approve(pool.target, stake1Amount);
    await pool.connect(accounts[1]).deposit(stake1Amount);

    let stake2Amount = 20;
    await stakingToken.connect(accounts[2]).approve(pool.target, stake2Amount);
    await pool.connect(accounts[2]).deposit(stake2Amount);

    // start a new reward phase of 1000s .
    // reward: 1 token per second => 1000 tokens
    let period = 1000;
    let reward = 1 * period;

    let start = await time.latest();
    let end = start + period;

    await rewardToken.approve(pool.target, reward);
    await pool.newRewardPeriod(reward, start, end);

    // wait some time
    await time.increase(100);

    // stake LP tokens
    await pool.connect(accounts[1]).startStake(stake1Amount);
    await pool.connect(accounts[2]).startStake(stake2Amount);

    // wait some time
    await time.increase(100);

    let rewardBalance1Before = await rewardToken.balanceOf(accounts[1].address);
    let rewardBalance2Before = await rewardToken.balanceOf(accounts[2].address);

    // end stakes
    await pool.connect(accounts[1]).endStake(1);
    await pool.connect(accounts[2]).endStake(1);

    let rewardBalance1After = await rewardToken.balanceOf(accounts[1].address);
    let rewardBalance2After = await rewardToken.balanceOf(accounts[2].address);

    let rewardEarned1 = rewardBalance1After - rewardBalance1Before;
    let rewardEarned2 = rewardBalance2After - rewardBalance2Before;

    assert.equal(
      Math.round(Number(rewardEarned2 / rewardEarned1)),
      2,
      "Reward earned by account2 should be double that of account1",
    );
  });

  it("The reward of 2 non overlapping stakes of the same duration and different amounts should be the same", async () => {
    const { pool, rewardToken, stakingToken, accounts } =
      await loadFixture(fixture);

    // deposit LP tokens
    let stake1Amount = 10n;
    await stakingToken.connect(accounts[1]).approve(pool.target, stake1Amount);
    await pool.connect(accounts[1]).deposit(stake1Amount);

    let stake2Amount = 20n;
    await stakingToken.connect(accounts[2]).approve(pool.target, stake2Amount);
    await pool.connect(accounts[2]).deposit(stake2Amount);

    // start a new reward phase of 1000 seconds
    // reward: 1 token per second => 1000 tokens
    let period = 1000n;
    let reward = 1n * period;

    await rewardToken.approve(pool.target, reward);

    let start = BigInt(await time.latest());
    let end = start + period;

    await pool.newRewardPeriod(reward, start, end);

    // get reward token balance before staking starts
    let rewardBalance1Before = await rewardToken.balanceOf(accounts[1].address);
    let rewardBalance2Before = await rewardToken.balanceOf(accounts[2].address);

    // start account 1 stake
    await pool.connect(accounts[1]).startStake(stake1Amount);

    // wait 50s
    await time.increase(50);

    // start account 2 stake
    await pool.connect(accounts[2]).startStake(stake2Amount);

    // end account 1 stake
    await pool.connect(accounts[1]).endStake(stake1Amount);

    // wait 50s
    await time.increase(50);

    // end second stake
    await pool.connect(accounts[2]).endStake(stake2Amount);

    let rewardBalance1After = await rewardToken.balanceOf(accounts[1].address);
    let rewardBalance2After = await rewardToken.balanceOf(accounts[2].address);

    let rewardEarned1 = rewardBalance1After - rewardBalance1Before;
    let rewardEarned2 = rewardBalance2After - rewardBalance2Before;

    expect(Math.round(Number(rewardEarned2) / Number(rewardEarned1))).to.equal(
      1,
      "Reward earned by account1 should be the same as that of account2",
    );
  });

  it("The rewards for 2 non overlapping stakes of the same amount, should be proportional to the time the tokens were staked", async () => {
    const { pool, rewardToken, stakingToken, accounts } =
      await loadFixture(fixture);

    // deposit lp tokens
    let stake1Amount = 10n;
    await stakingToken.connect(accounts[1]).approve(pool.target, stake1Amount);
    await pool.connect(accounts[1]).deposit(stake1Amount);

    let stake2Amount = 10n;
    await stakingToken.connect(accounts[2]).approve(pool.target, stake2Amount);
    await pool.connect(accounts[2]).deposit(stake2Amount);

    // start a new reward phase of 1000 seconds
    // reward: 1 token per second => 1000 tokens
    let period = 1000n;
    let reward = 1n * period;

    await rewardToken.approve(pool.target, reward);

    let start = BigInt(await time.latest());
    let end = start + period;

    await pool.newRewardPeriod(reward, start, end);

    // reward balances before staking
    let rewardBalance1Before = await rewardToken.balanceOf(accounts[1].address);
    let rewardBalance2Before = await rewardToken.balanceOf(accounts[2].address);

    // start 1st stake
    await time.increase(30);
    await pool.connect(accounts[1]).startStake(stake1Amount);

    // end 1st stake after 100
    let stake1Interval = 100;
    await time.increase(stake1Interval);
    await pool.connect(accounts[1]).endStake(stake1Amount);

    // wait 50
    await time.increase(50);

    // start 2nd stake
    await pool.connect(accounts[2]).startStake(stake2Amount);

    // end 2nd stake after 200
    let stake2Interval = 200;
    await time.increase(stake2Interval);
    await pool.connect(accounts[2]).endStake(stake2Amount);

    // get reward balance after
    let rewardBalance1After = await rewardToken.balanceOf(accounts[1].address);
    let rewardBalance2After = await rewardToken.balanceOf(accounts[2].address);

    let rewardEarned1 = rewardBalance1After - rewardBalance1Before;
    let rewardEarned2 = rewardBalance2After - rewardBalance2Before;

    expect(Math.round(Number(rewardEarned2) / Number(rewardEarned1))).to.equal(
      stake2Interval / stake1Interval,
      "Reward earned by account2 should be double that of account1",
    );
  });

  it("The reward of several stakes from 2 accounts should be proportional to the amount and time of the tokens staked", async () => {
    const { pool, rewardToken, stakingToken, accounts } =
      await loadFixture(fixture);

    // deposit lp tokens
    let stake = 100n;
    let stake1Amount = 1n * stake;
    await stakingToken.connect(accounts[1]).approve(pool.target, stake1Amount);
    await pool.connect(accounts[1]).deposit(stake1Amount);

    let stake2Amount = 3n * stake;
    await stakingToken.connect(accounts[2]).approve(pool.target, stake2Amount);
    await pool.connect(accounts[2]).deposit(stake2Amount);

    let rewardBalance1Before = await rewardToken.balanceOf(accounts[1].address);
    let rewardBalance2Before = await rewardToken.balanceOf(accounts[2].address);

    // start a new reward phase of 10 days of 100 seconds
    let day = 100n;
    let rewardPeriod = 20n * day;
    let reward = 1n * rewardPeriod;

    await rewardToken.approve(pool.target, reward);

    let start = BigInt(await time.latest());
    let end = start + rewardPeriod;

    // day 0
    await pool.newRewardPeriod(reward, start, end);

    // day 1
    await pool.connect(accounts[1]).startStake(stake1Amount); // STAKE 1

    let ts1s = BigInt(await time.latest());
    await time.increase(Number(day));
    let ts1e = BigInt(await time.latest());

    let reward1Day1 = await pool.connect(accounts[1]).claimableReward();
    let expected1Day1 = ts1e - ts1s;
    expect(reward1Day1).to.equal(
      expected1Day1,
      "Incorrect day 1 reward for account 1",
    );

    // day 2
    await pool.connect(accounts[2]).startStake(stake2Amount); // STAKE 2

    let ts2s = BigInt(await time.latest());
    await time.increase(Number(day));
    let ts2e = BigInt(await time.latest());

    let reward1Day2 = await pool.connect(accounts[1]).claimableReward();
    let expected1Day2 = ts2s - ts1s + ((ts2e - ts2s) * 1n) / 4n;
    expect(reward1Day2).to.equal(
      expected1Day2,
      "Incorrect day 2 reward for account 1",
    );

    let reward2Day2 = await pool.connect(accounts[2]).claimableReward();
    let expected2Day2 = ((ts2e - ts2s) * 3n) / 4n;
    expect(reward2Day2).to.equal(
      expected2Day2,
      "Incorrect day 2 reward for account 2",
    );

    // day 3
    await time.increase(Number(day));

    await pool.connect(accounts[1]).endStake(stake); // END STAKE 1
    let ts3e1 = BigInt(await time.latest());
    await pool.connect(accounts[2]).endStake(stake); // END STAKE 2
    let ts3e2 = BigInt(await time.latest());

    let claimable1Day3 = await pool.connect(accounts[1]).claimableReward();
    let claimable2Day3 = await pool.connect(accounts[2]).claimableReward();

    expect(claimable1Day3).to.equal(
      0n,
      "Account 1 should not have any reward to claim after ending stake",
    );
    expect(claimable2Day3).to.equal(
      0n,
      "Account 2 should not have any reward to claim after ending stake",
    );

    let rewardBalance1After = await rewardToken.balanceOf(accounts[1].address);
    let rewardBalance2After = await rewardToken.balanceOf(accounts[2].address);
    let rewardEarned1 = rewardBalance1After - rewardBalance1Before;
    let rewardEarned2 = rewardBalance2After - rewardBalance2Before;
    let totalRewardDistributed = rewardEarned1 + rewardEarned2;

    // calculate expected total reward received by account1 and account2
    let expected1Day3 = ts2s - ts1s + ((ts3e1 - ts2s) * 1n) / 4n;
    let expected2Day3 = ((ts3e2 - ts2s) * 3n) / 4n;

    expect(rewardEarned1).to.equal(
      expected1Day3,
      "Incorrect reward received by account 1",
    );
    expect(rewardEarned2).to.equal(
      expected2Day3,
      "Incorrect reward received by account 2",
    );

    let expectedRewardDistributed = ts3e2 - ts1s;
    expect(totalRewardDistributed).to.be.closeTo(
      expectedRewardDistributed,
      1n,
      "Incorrect total reward distributed",
    );
  });
});
