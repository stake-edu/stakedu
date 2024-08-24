import { use } from "react";
import { useAccount, useBalance } from "wagmi";

import {
  useReadStakingPoolGetBalance,
  useReadStakingPoolGetStakedBalance,
  useReadStakingRewardPoolGetBalance,
  useReadStakingRewardPoolGetCurrentRewardPeriodId,
  useReadStakingRewardPoolGetRewardsStats,
  useReadStakingRewardPoolRewardPeriods,
} from "../hooks/generated";
import { format } from "../utilities";

export default () => {
  const account = useAccount();

  const id = useReadStakingRewardPoolGetCurrentRewardPeriodId({
    address: "0xc819E7ecbF6C1Fc0e2ADA9dd33da55Cd76918aeE",
  });
  const period = useReadStakingRewardPoolRewardPeriods({
    address: "0xc819E7ecbF6C1Fc0e2ADA9dd33da55Cd76918aeE",
    args: [id?.data && id.data - BigInt(1)],
  });

  const staked = useReadStakingPoolGetStakedBalance({
    address: "0xc819E7ecbF6C1Fc0e2ADA9dd33da55Cd76918aeE",
    account: account.address,
  });

  const reward = useReadStakingRewardPoolGetRewardsStats({
    address: "0xc819E7ecbF6C1Fc0e2ADA9dd33da55Cd76918aeE",
    account: account.address,
  });

  const share =
    staked?.data && period?.data?.totalStaked > 0
      ? Math.round(
          Number((staked?.data * BigInt(100)) / period?.data?.totalStaked),
        )
      : "0";

  return (
    <div className="flex bg-neutral-50 p-6 rounded-md shadow-md">
      <div className="flex-1 text-center">
        <div className="text-lg">Total EDU staked</div>
        <div className="text-3xl font-bold">
          {format(period?.data?.totalStaked)}{" "}
          <span className="text-base">EDU</span>
        </div>
      </div>
      <div className="flex-1 text-center">
        <div className="text-lg">My tokens staked</div>
        <div className="text-3xl font-bold">
          {format(staked?.data)} <span className="text-base">EDU</span>
        </div>
      </div>
      <div className="flex-1 text-center">
        <div className="text-lg">My pool share</div>
        <div className="text-3xl font-bold">
          {share}
          <span className="text-base">%</span>
        </div>
      </div>
      <div className="flex-1 text-center">
        <div className="text-lg">My rewards received</div>
        <div className="text-3xl font-bold">
          {format(reward?.data?.rewardsPaid)}{" "}
          <span className="text-base">OC points</span>
        </div>
      </div>
    </div>
  );
};
