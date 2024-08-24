import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { assert, expect } from "chai";
import hre from "hardhat";

describe("Wallet", function () {
  async function fixture() {
    const ETB = await hre.ethers.deployContract("ETB");
    const cakeLP = await hre.ethers.deployContract("CakeLP");

    const POOL = await hre.ethers.getContractFactory("StakingPool");
    const pool = await POOL.deploy(ETB.target, cakeLP.target);
    await pool.waitForDeployment();

    return { pool, cakeLP };
  }

  it("deposit CaleLP tokens into the pool should increase the account balance", async () => {
    const { pool, cakeLP } = await loadFixture(fixture);

    let balanceBefore = await pool.getBalance();
    assert.equal(balanceBefore, 0n, "Account should have no balance");

    // deposit 100 CakeLP
    let depositAmount = 100n;
    await cakeLP.approve(pool.getAddress(), depositAmount);
    await pool.deposit(depositAmount);

    let balanceAfter = await pool.getBalance();
    assert.equal(
      balanceAfter,
      depositAmount,
      "Account should have expected token balance",
    );
  });

  it("withdraw CaleLP tokens from the pool should reduce the account balance", async () => {
    const { pool, cakeLP } = await loadFixture(fixture);

    let balance = await pool.getBalance();
    assert.equal(balance, 0n, "Account should have no balance");

    // deposit 100 CakeLP
    let depositAmount = 100n;
    await cakeLP.approve(pool.target, depositAmount);
    await pool.deposit(depositAmount);

    // withdraw
    await pool.withdraw(depositAmount);

    let balanceAfter = await pool.getBalance();
    assert.equal(
      balanceAfter,
      0n,
      "Account should have no token after withdraw",
    );
  });

  it("attempting to withdraw more CaleLP tokens than available in balance should throw", async () => {
    const { pool, cakeLP } = await loadFixture(fixture);

    let balance = await pool.getBalance();
    assert.equal(balance, 0n, "Account should have no balance");

    // deposit 100 CakeLP
    let depositAmount = 100;
    await cakeLP.approve(pool.target, depositAmount);
    await pool.deposit(depositAmount);

    await expect(pool.withdraw(depositAmount + 1)).to.be.reverted;
  });
});
