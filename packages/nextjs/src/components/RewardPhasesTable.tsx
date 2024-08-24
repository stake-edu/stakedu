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
            args: [BigInt(i)],
          }),
        ),
    ).then(setRewardPeriods);
  }, [count?.data]);

  return (
    <>
      {rewardPeriods.length === 0 ? (
        <div className="mx-auto mt-2 max-w-[1000px] p-0">
          <div
            className="border-l-4 border-blue-500 bg-blue-100 p-4 text-blue-700"
            role="alert"
          >
            No reward phase configured
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-[1000px] p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b px-4 py-2">#</th>
                  <th className="border-b px-4 py-2">Start Date</th>
                  <th className="border-b px-4 py-2">End Date</th>
                  <th className="border-b px-4 py-2">Total Reward</th>
                  <th className="border-b px-4 py-2">Reward / sec</th>
                  <th className="border-b px-4 py-2">Currently Staked</th>
                </tr>
              </thead>
              <tbody>
                {rewardPeriods.map((period) => {
                  const fromDate = new Date(Number(period.from) * 1000);
                  const toDate = new Date(Number(period.to) * 1000);

                  return (
                    <tr key={period.id} className="hover:bg-gray-50">
                      <td className="border-b px-4 py-2 text-center">
                        {period.id.toString()}
                      </td>
                      <td className="border-b px-4 py-2 text-center">{`${fromDate.toLocaleDateString()} ${fromDate.toLocaleTimeString()}`}</td>
                      <td className="border-b px-4 py-2 text-center">{`${toDate.toLocaleDateString()} ${toDate.toLocaleTimeString()}`}</td>
                      <td className="border-b px-4 py-2 text-right">
                        {format(period.reward)} OC
                      </td>
                      <td className="border-b px-4 py-2 text-right">
                        {format(period.reward / (period.to - period.from))} OC/s
                      </td>
                      <td className="border-b px-4 py-2 text-right">
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
