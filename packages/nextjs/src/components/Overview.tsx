import { useAccount } from "wagmi";

import { ADDRESS_POOL } from "../consts";
import {
  useReadStakingPoolGetStakedBalance,
  useReadStakingRewardPoolGetCurrentRewardPeriodId,
  useReadStakingRewardPoolGetRewardsStats,
  useReadStakingRewardPoolRewardPeriods,
} from "../hooks/generated";
import { format } from "../utilities";

export default () => {
  const account = useAccount();

  const id = useReadStakingRewardPoolGetCurrentRewardPeriodId({
    address: ADDRESS_POOL,
  });
  const period = useReadStakingRewardPoolRewardPeriods({
    address: ADDRESS_POOL,
    args: [(id?.data && id.data - BigInt(1))!],
  });

  const staked = useReadStakingPoolGetStakedBalance({
    address: ADDRESS_POOL,
    account: account.address,
  });

  const reward = useReadStakingRewardPoolGetRewardsStats({
    address: ADDRESS_POOL,
    account: account.address,
  });

  const share =
    staked?.data && period?.data && period?.data?.totalStaked > 0
      ? Math.round(
          Number((staked?.data * BigInt(100)) / period?.data?.totalStaked),
        )
      : "0";

  return (
    <div className="flex rounded bg-neutral-50 p-6 px-12 shadow-sm">
      <div className="flex-1 text-left">
        <div className="font-semibold">Total EDU staked</div>
        <div>
          <span className="text-2xl font-bold text-purple-800">
            {format(period?.data?.totalStaked)}
          </span>
          <span className="ml-2 text-sm">EDU</span>
        </div>
      </div>
      <div className="flex-1 text-left">
        <div className="font-semibold">My tokens staked</div>
        <div>
          <span className="text-2xl font-bold text-purple-800">
            {format(staked?.data)}
          </span>
          <span className="ml-2 text-sm">EDU</span>
        </div>
      </div>
      <div className="flex-1 text-left">
        <div className="font-semibold">My pool share</div>
        <div>
          <span className="text-2xl font-bold text-purple-800">{share}</span>
          <span className="ml-2 text-sm">%</span>
        </div>
      </div>
      <div className="flex-1 text-left">
        <div className="font-semibold">My rewards received</div>
        <div>
          <span className="text-2xl font-bold text-purple-800">
            {format(reward?.data?.rewardsPaid)}
          </span>
          <span className="ml-2 text-sm">OC points</span>
        </div>
      </div>
    </div>
  );
};
