import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { assert, expect } from "chai";
import hre from "hardhat";

describe("StakingPool", () => {
  async function fixture() {
    const ETB = await hre.ethers.deployContract("ETB");
    const cakeLP = await hre.ethers.deployContract("CakeLP");

    const POOL = await hre.ethers.getContractFactory("StakingPool");
    const pool = await POOL.deploy(ETB.target, cakeLP.target);
    await pool.waitForDeployment();

    return { pool, cakeLP };
  }

  it("staking CaleLP tokens should decrease the account balance", async () => {
    const { pool, cakeLP } = await loadFixture(fixture);

    // deposit 100 CakeLP
    let depositAmount = 100n;
    await cakeLP.approve(pool.target, depositAmount);
    await pool.deposit(depositAmount);

    let balance = await pool.getBalance();
    assert.equal(balance, depositAmount, "Invalid initial token balance");

    // stake 60 CakeLP
    let stakedAmount = 60n;
    await pool.startStake(stakedAmount);

    let balanceAfter = await pool.getBalance();
    let expectedBalance = depositAmount - stakedAmount;
    assert.equal(
      balanceAfter,
      expectedBalance,
      "Invalid token balance after staking",
    );
  });

  it("staking CaleLP tokens should increase the staked token balance", async () => {
    const { pool, cakeLP } = await loadFixture(fixture);

    // deposit 100 CakeLP
    await cakeLP.approve(pool.target, 100n);
    await pool.deposit(100n);

    // initial stake
    let stakedTokens = await pool.getStakedBalance();
    assert.equal(
      stakedTokens,
      0n,
      "Account should have no staked tokens balance",
    );

    // stake 60 CakeLP
    let stakedAmount = 60n;
    await pool.startStake(stakedAmount);

    let stakedTokensAfter = await pool.getStakedBalance();
    assert.equal(
      stakedTokensAfter,
      stakedAmount,
      "Account should have expected staked tokens balance",
    );
  });

  it("staking additional tokens should increase the staked token balance", async () => {
    const { pool, cakeLP } = await loadFixture(fixture);

    // deposit 100 CakeLP
    await cakeLP.approve(pool.target, 100n);
    await pool.deposit(100n);

    // stake 30 CakeLP
    let firstStakeAmount = 30n;
    await pool.startStake(firstStakeAmount);

    let balance1 = await pool.getStakedBalance();
    assert.equal(
      balance1,
      firstStakeAmount,
      "Invalid staked balance after 1st stake",
    );

    let deltaTime = 10;
    await time.increase(deltaTime);

    // stake 40 CakeLP
    let secondStakeAmount = 40n;
    await pool.startStake(secondStakeAmount);

    let balance2 = await pool.getStakedBalance();
    assert.equal(
      balance2,
      firstStakeAmount + secondStakeAmount,
      "Invalid staked balance after 2nd stake",
    );
  });

  it("unstaking CaleLP tokens should increase the CaleLP balance", async () => {
    const { pool, cakeLP } = await loadFixture(fixture);

    // deposit 100 CakeLP
    await cakeLP.approve(pool.target, 100n);
    await pool.deposit(100n);

    // stake 30 CakeLP
    let stakedAmount = 30n;
    await pool.startStake(stakedAmount);

    // end stake
    let balanceBefore = await pool.getBalance();
    await pool.endStake(stakedAmount);
    let balanceAfter = await pool.getBalance();

    assert.equal(
      balanceAfter,
      balanceBefore + stakedAmount,
      "Invalid account balance after end stake",
    );
  });

  it("unstaking CaleLP tokens should decrease the staked balance", async () => {
    const { pool, cakeLP } = await loadFixture(fixture);

    // deposit 100 CakeLP
    let depositAmount = 100n;
    await cakeLP.approve(pool.target, depositAmount);
    await pool.deposit(depositAmount);

    // stake 30 CakeLP
    let stakedAmount = 30n;
    await pool.startStake(stakedAmount);

    // end stake
    let stakedBalanceBefore = await pool.getStakedBalance();
    await pool.endStake(stakedAmount);
    let stakedBalanceAfter = await pool.getStakedBalance();

    assert.equal(
      stakedBalanceAfter,
      stakedBalanceBefore - stakedAmount,
      "Invalid staked balance after end stake",
    );
  });

  it("attempting to end stake with no active stake should throw", async () => {
    const { pool, cakeLP } = await loadFixture(fixture);

    let balance = await pool.getBalance();
    assert.equal(balance, 0n, "Account should have no balance");

    // deposit 100 CakeLP
    let depositAmount = 100n;
    await cakeLP.approve(pool.target, depositAmount);
    await pool.deposit(depositAmount);

    await expect(pool.endStake(100n)).to.be.reverted;
  });
});
