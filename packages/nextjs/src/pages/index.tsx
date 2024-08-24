import React, { useState } from "react";
import { useAccount } from "wagmi";

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
  const unstaked = useReadErc20BalanceOf({
    address: ADDRESS_TOKEN_STAKING,
    args: [account.address!],
  });
  const staked = useReadStakingPoolGetStakedBalance({
    address: ADDRESS_POOL,
    account: account.address,
  });

  const { writeContractAsync } = useWriteStakingRewardPoolClaimReward();

  const [state, setState] = useState<Record<string, any>>({
    error: null,
    info: null,
  });

  const handleSuccess = (result) => {
    setState((prevState) => ({
      ...prevState,
      info: {
        title: "Success!",
        detail: result,
      },
    }));
  };

  const handleError = (error, message) => {
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

      <div className={"mx-auto p-0 max-w-[1000px]"}>
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

        <section className="bg-purple-100 p-6 rounded-lg mb-8">
          <h2 className="font-title text-xl mb-6">My Dashboard</h2>
          <Overview />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl mb-4">Unstaked Balance</h3>
              <div className="bg-neutral-50 p-4 rounded-md shadow-md flex items-center justify-between mb-4">
                <span>Balance not yet staked</span>
                <div className="text-2xl font-bold">
                  {format(unstaked?.data)}{" "}
                  <span className="text-base">EDU</span>
                </div>
              </div>
              <StakeView
                lpUnstaked={unstaked?.data}
                lpStaked={staked?.data}
                handleSuccess={handleSuccess}
                handleError={handleError}
              />
            </div>
            <div>
              <h3 className="text-xl mb-4">Rewards</h3>
              <div className="bg-neutral-50 p-4 rounded-md shadow-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Current rewards rate (variable)</span>
                  <span className="text-2xl font-bold">
                    {format(
                      reward?.data?.rewardRate &&
                        reward?.data.rewardRate * 60n * 60n * 24n,
                    )}{" "}
                    <span className="text-base">OC points/day</span>
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Total rewards paid</span>
                  <span className="text-2xl font-bold">
                    {format(reward?.data?.totalRewardsPaid)}{" "}
                    <span className="text-base">OC points</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Claimable rewards</span>
                  <span className="text-2xl font-bold">
                    {format(reward?.data?.claimableRewards)}{" "}
                    <span className="text-base">OC points</span>
                  </span>
                </div>
              </div>
              <button
                className="bg-purple-600 text-white py-2 px-4 rounded-md w-full"
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
