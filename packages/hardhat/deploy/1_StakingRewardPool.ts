import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getUnnamedAccounts } = hre;
  const { deploy } = deployments;
  const [deployer] = await getUnnamedAccounts();

  const rewardToken = await deployments.get("RewardToken");
  const stakingTokenAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  await deploy("StakingRewardPool", {
    from: deployer,
    log: true,
    args: [rewardToken.address, stakingTokenAddress],
  });
};

export default func;
