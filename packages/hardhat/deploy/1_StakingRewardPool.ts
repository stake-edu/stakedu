import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getUnnamedAccounts } = hre;
  const { deploy } = deployments;
  const [deployer] = await getUnnamedAccounts();

  const rewardToken = await deployments.get("ETB");
  const stakingToken = await deployments.get("CakeLP");

  await deploy("StakingRewardPool", {
    from: deployer,
    log: true,
    args: [rewardToken.address, stakingToken.address],
  });
};

export default func;
