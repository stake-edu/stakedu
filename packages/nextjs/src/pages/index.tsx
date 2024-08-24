import React, { useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAccount } from "wagmi";

import { AlertDismissible } from "../components/AlertDismissible";
import Header from "../components/Header";
import Overview from "../components/Overview";
import StakeView from "../components/StakeView";
import {
  useReadErc20BalanceOf,
  useReadStakingRewardPoolGetRewardsStats,
  useWriteStakingRewardPoolClaimReward,
} from "../hooks/generated";
import { format } from "../utilities";
import { getBalance as getBalanceLP } from "../web3/cake_lp";
import { getCurrentRewardPeriod } from "../web3/reward_phases";
import { getRewardsStats, getStakedBalance } from "../web3/stakes";

const IndexPage = () => {
  const account = useAccount();
  const reward = useReadStakingRewardPoolGetRewardsStats({
    address: "0xc819E7ecbF6C1Fc0e2ADA9dd33da55Cd76918aeE",
    account: account.address,
  });
  const unstaked = useReadErc20BalanceOf({
    address: "0xF72505292DC7055b82Ba79A84f8c255c53b6E982",
    args: [account.address!],
  });

  const { writeContractAsync } = useWriteStakingRewardPoolClaimReward();

  /// OLD
  const [state, setState] = useState({
    accountConnected: true,
    currentRewardPerdiod: undefined,
    lpUnstaked: undefined,
    lpStaked: undefined,
    claimableRewards: undefined,
    rewardsPaid: undefined,
    rewardRate: undefined,
    totalRewardsPaid: undefined,
    error: null,
    info: null,
  });

  const headerRef = useRef();

  useEffect(() => {
    reload();
  }, []);

  const reload = () => {
    loadBalances();
  };

  const loadBalances = async () => {
    try {
      const period = await getCurrentRewardPeriod();
      setState((prevState) => ({ ...prevState, currentRewardPerdiod: period }));

      if (period) {
        const stakedBalance = await getStakedBalance();
        setState((prevState) => ({ ...prevState, lpStaked: stakedBalance }));

        const balanceLP = await getBalanceLP();
        setState((prevState) => ({
          ...prevState,
          lpUnstaked: balanceLP.units,
        }));

        const info = await getRewardsStats();
        console.log(">>> info: ", info);
        setState((prevState) => ({ ...prevState, ...info }));
      }
    } catch (error) {
      setState((prevState) => ({ ...prevState, error: error.message }));
    }
  };

  const handleAllowanceUpdated = async () => {
    console.log(">>> handleAllowanceUpdated() -- TODO");
  };

  const handleSuccess = (result) => {
    headerRef.current.reload();
    reload();
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

  console.log(">>>> render", state);
  const {
    accountConnected,
    lpUnstaked,
    lpStaked,
    claimableRewards,
    rewardsPaid,
    rewardRate,
    totalRewardsPaid,
    currentRewardPerdiod,
    error,
    info,
  } = state;

  if (!accountConnected)
    return (
      <>
        <Header />
        <div className={"mx-auto p-0 max-w-[1000px]"}>
          <Alert
            variant="info"
            title="No Ethereum account connected"
            style={{ textAlign: "center" }}
          >
            Please connect an Ethereum account to use the dapp!
          </Alert>
        </div>
      </>
    );

  return (
    <>
      <Header />

      <div className={"mx-auto p-0 max-w-[1000px]"}>
        {error && (
          <AlertDismissible variant="danger" title="Error">
            {" "}
            {error}{" "}
          </AlertDismissible>
        )}
        {info && (
          <AlertDismissible variant="info" title={info.title}>
            {info.detail}
          </AlertDismissible>
        )}

        {!currentRewardPerdiod && (
          <Alert variant="info"> No Active Reward Period. </Alert>
        )}

        {currentRewardPerdiod && (
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
                  lpUnstaked={lpUnstaked}
                  lpStaked={lpStaked}
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
                      address: "0xc819E7ecbF6C1Fc0e2ADA9dd33da55Cd76918aeE",
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
        )}
      </div>
    </>
  );
};

export default IndexPage;
