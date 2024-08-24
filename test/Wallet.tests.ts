import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { assert, expect } from "chai";
import { ZeroAddress } from "ethers";
import hre from "hardhat";

describe("Wallet", function () {
  async function fixture() {
    const stakingToken = await hre.ethers.deployContract("CakeLP");

    const Wallet = await hre.ethers.getContractFactory("Wallet");
    const wallet = await Wallet.deploy(stakingToken.target);
    await wallet.waitForDeployment();

    return { wallet, stakingToken };
  }

  it("Deposit tokens into the wallet should increase the account balance", async () => {
    const { wallet, stakingToken } = await loadFixture(fixture);

    let balanceBefore = await wallet.getBalance();
    assert.equal(balanceBefore, 0n, "Account should have no balance");

    // deposit 100
    let depositAmount = 100n;
    await stakingToken.approve(wallet.getAddress(), depositAmount);
    await wallet.deposit(depositAmount);

    let balanceAfter = await wallet.getBalance();
    assert.equal(
      balanceAfter,
      depositAmount,
      "Account should have expected token balance",
    );
  });

  it("Deposit tokens from the wallet should reduce the account balance", async () => {
    const { wallet, stakingToken } = await loadFixture(fixture);

    let balance = await wallet.getBalance();
    assert.equal(balance, 0n, "Account should have no balance");

    // deposit 100
    let depositAmount = 100n;
    await stakingToken.approve(wallet.target, depositAmount);
    await wallet.deposit(depositAmount);

    // withdraw
    await wallet.withdraw(depositAmount);

    let balanceAfter = await wallet.getBalance();
    assert.equal(
      balanceAfter,
      0n,
      "Account should have no token after withdraw",
    );
  });

  it("Attempting to withdraw more tokens than available in balance should throw", async () => {
    const { wallet, stakingToken } = await loadFixture(fixture);

    let balance = await wallet.getBalance();
    assert.equal(balance, 0n, "Account should have no balance");

    // deposit 100
    let depositAmount = 100;
    await stakingToken.approve(wallet.target, depositAmount);
    await wallet.deposit(depositAmount);

    await expect(wallet.withdraw(depositAmount + 1)).to.be.reverted;
  });
});
