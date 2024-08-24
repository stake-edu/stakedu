import React, { useEffect, useState } from "react";
import { useConfig } from "wagmi";

import { ADDRESS_POOL } from "../consts";
import {
  readStakingRewardPoolRewardPeriods,
  useReadStakingRewardPoolGetRewardPeriodsCount,
} from "../hooks/generated";
import { format } from "../utilities";

interface RewardPeriod {
  id: bigint;
  from: bigint;
  to: bigint;
  reward: bigint;
  totalStaked: bigint;
}

const RewardPhaseTable = () => {
  const [rewardPeriods, setRewardPeriods] = useState<RewardPeriod[]>([]);

  const config = useConfig();
  const count = useReadStakingRewardPoolGetRewardPeriodsCount({
    address: ADDRESS_POOL,
  });


  useEffect(() => {
    if (count?.data === undefined) {
      return;
    }

    Promise.all(
      Array(Number(count.data))
        .fill(undefined)
        .map(async (_, i) => 
          readStakingRewardPoolRewardPeriods(config, {
            address: ADDRESS_POOL,
            args: [i],
          })
        ),
    ).then(setRewardPeriods);
  }, [count?.data]);

  return (
    <>
      {rewardPeriods.length === 0 ? (
        <div className="mx-auto p-0 max-w-[1000px] mt-2">
          <div
            className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4"
            role="alert"
          >
            No reward phase configured
          </div>
        </div>
      ) : (
        <div className="mx-auto p-0 max-w-[1000px]">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">#</th>
                  <th className="py-2 px-4 border-b">Start Date</th>
                  <th className="py-2 px-4 border-b">End Date</th>
                  <th className="py-2 px-4 border-b">Total Reward</th>
                  <th className="py-2 px-4 border-b">Reward / sec</th>
                  <th className="py-2 px-4 border-b">Currently Staked</th>
                </tr>
              </thead>
              <tbody>
                {rewardPeriods.map((period) => {
                  const fromDate = new Date(Number(period.from) * 1000);
                  const toDate = new Date(Number(period.to) * 1000);

                  return (
                    <tr key={period.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b text-center">
                        {period.id.toString()}
                      </td>
                      <td className="py-2 px-4 border-b text-center">{ `${fromDate.toLocaleDateString()} ${fromDate.toLocaleTimeString()}`}</td>
                      <td className="py-2 px-4 border-b text-center">{ `${toDate.toLocaleDateString()} ${toDate.toLocaleTimeString()}`}</td>
                      <td className="py-2 px-4 border-b text-right">
                        {format(period.reward)} OC
                      </td>
                      <td className="py-2 px-4 border-b text-right">
                        {format(period.reward / (period.to - period.from))} OC/s
                      </td>
                      <td className="py-2 px-4 border-b text-right">
                        {format(period.totalStaked)} EDU
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default RewardPhaseTable;
