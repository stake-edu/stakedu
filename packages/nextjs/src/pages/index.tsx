import React, { useState } from "react";
import { useAccount, useBalance } from "wagmi";

import { AlertDismissible } from "../components/AlertDismissible";
import Header from "../components/Header";
import Overview from "../components/Overview";
import StakeView from "../components/StakeView";
import { ADDRESS_POOL, ADDRESS_TOKEN_STAKING } from "../consts";
import {
  useReadErc20BalanceOf,
  useReadStakingPoolGetStakedBalance,
  useReadStakingRewardPoolGetRewardsStats,
  useWriteStakingRewardPoolClaimReward,
} from "../hooks/generated";
import { format } from "../utilities";

const IndexPage = () => {
  const account = useAccount();
  const reward = useReadStakingRewardPoolGetRewardsStats({
    address: ADDRESS_POOL,
    account: account.address,
  });
  const unstaked = useBalance({ address: account.address });
  // const unstaked = useReadErc20BalanceOf({
  //   address: ADDRESS_TOKEN_STAKING,
  //   args: [account.address!],
  // });

  const staked = useReadStakingPoolGetStakedBalance({
    address: ADDRESS_POOL,
    account: account.address,
  });

  const { writeContractAsync } = useWriteStakingRewardPoolClaimReward();

  const [state, setState] = useState<Record<string, any>>({
    error: null,
    info: null,
  });

  const handleSuccess = (result: string) => {
    setState((prevState) => ({
      ...prevState,
      info: {
        title: "Success!",
        detail: result,
      },
    }));
  };

  const handleError = (error: Error, message?: string) => {
    if (message) {
      setState((prevState) => ({ ...prevState, error: message }));
    } else if (error && error.message) {
      setState((prevState) => ({ ...prevState, error: error.message }));
    } else {
      setState((prevState) => ({
        ...prevState,
        error: `An error occurred (${error})`,
      }));
    }
  };

  const { error, info } = state;

  return (
    <>
      <Header />

      <div>
        {error && (
          <AlertDismissible variant="error" title="Error">
            {" "}
            {error}{" "}
          </AlertDismissible>
        )}
        {info && (
          <AlertDismissible variant="info" title={info.title}>
            {info.detail}
          </AlertDismissible>
        )}

        <section className="mx-auto my-8 max-w-screen-xl rounded bg-purple-100 p-16">
          <h3 className="mb-8 text-lg font-bold">My Dashboard</h3>
          <Overview />

          <div className="mt-8 grid grid-cols-2 gap-14">
            <div>
              <h3 className="mb-4 text-lg font-bold">Unstaked Balance</h3>
              <div className="mb-4 flex items-center justify-between rounded-md bg-neutral-50 p-4 font-semibold shadow-md">
                Balance not yet staked
                <div>
                  <span className="text-2xl font-semibold text-purple-800">
                    {format(unstaked?.data?.value)}{" "}
                  </span>
                  <span className="ml-2 text-sm">EDU</span>
                </div>
              </div>
              <StakeView
                lpUnstaked={unstaked?.data?.value}
                lpStaked={staked?.data}
                handleSuccess={handleSuccess}
                handleError={handleError}
              />
            </div>

            <div>
              <h2 className="mb-4 text-lg font-bold">Rewards</h2>
              <div className="mb-4 rounded-md bg-neutral-50 p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-semibold">
                    Current rewards rate (variable)
                  </div>
                  <div className="flex-1 text-right text-xl font-semibold text-purple-800">
                    {format(
                      reward?.data?.rewardRate &&
                        reward?.data.rewardRate * BigInt(60 * 60 * 24),
                    )}
                  </div>
                  <div className="ml-4 w-28 flex-none text-left">
                    OC points/day
                  </div>
                </div>

                <div className="mb-2 flex items-center justify-between">
                  <div className="font-semibold">Total rewards paid</div>
                  <div className="flex-1 text-right text-xl font-semibold text-purple-800">
                    {format(reward?.data?.totalRewardsPaid)}
                  </div>
                  <div className="ml-4 w-28 flex-none text-left">OC points</div>
                </div>
              </div>
              <div className="mb-4 rounded-md bg-neutral-50 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Claimable rewards</div>
                  <div className="flex-1 text-right text-xl font-semibold text-purple-800">
                    {format(reward?.data?.claimableRewards)}{" "}
                  </div>
                  <div className="ml-4 w-28 flex-none text-left">OC points</div>
                </div>
              </div>
              <button
                className="w-full rounded-md bg-purple-600 px-4 py-2 font-semibold text-white"
                onClick={() =>
                  writeContractAsync({
                    address: ADDRESS_POOL,
                  })
                    .then(handleSuccess)
                    .catch(handleError)
                }
              >
                Claim rewards
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndexPage;
