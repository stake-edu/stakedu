import React, { useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

import { ADDRESS_POOL, ADDRESS_TOKEN_STAKING } from "../consts";
import {
  useReadErc20Allowance,
  useWriteErc20Approve,
  useWriteStakingPoolDepositAndStartStake,
  useWriteStakingRewardPoolEndStakeAndWithdraw,
} from "../hooks/generated";
import { format } from "../utilities";

const UpdateStakeForm: React.FC<{
  formType: "stake" | "unstake";
  balance: bigint | undefined;
  handleSuccess: (message: string) => void;
  handleError: (error: any, message: string) => void;
}> = ({ formType, balance, handleSuccess, handleError }) => {
  const [amount, setAmount] = useState("");

  const account = useAccount();

  const allowance = useReadErc20Allowance({
    address: ADDRESS_TOKEN_STAKING,
    args: [account.address!, ADDRESS_POOL],
  });
  const { writeContractAsync: approve } = useWriteErc20Approve();

  const { writeContractAsync: unstake } =
    useWriteStakingRewardPoolEndStakeAndWithdraw();

  const { writeContractAsync: stake } =
    useWriteStakingPoolDepositAndStartStake();

  const isValid =
    amount !== "" && balance !== undefined && parseEther(amount) <= balance;

  const isSufficientAllowance =
    allowance?.data !== undefined && allowance?.data >= parseEther(amount);

  const getStakeError = (error: any): string => {
    switch (true) {
      case error.message.includes("No active reward phase found"):
        return "No active reward phase found";
      case error.message.includes("Invalid reward amount"):
        return "Invalid reward amount";
      case error.message.includes("Invalid reward interval"):
        return "Invalid reward interval";
      default:
        return error.message;
    }
  };

  const submitForm = () => {
    if (!isValid) {
      return;
    }

    const value = parseEther(amount);

    if (formType === "stake" && !isSufficientAllowance) {
      return;
    }

    if (formType === "stake") {
      stake({
        address: ADDRESS_POOL,
        args: [value],
      })
        .then((hash) => {
          handleSuccess(`Stake increased. Transaction id: ${hash}`);
        })
        .catch((error) => {
          console.log(">>> onSubmit startStake error:", error);
          const message = getStakeError(error);
          handleError(error, message);
        });
      return;
    }

    if (formType === "unstake") {
      unstake({
        address: ADDRESS_POOL,
        args: [value],
      })
        .then((hash) => {
          handleSuccess(`Stake decreased. Transaction id: ${hash}`);
        })
        .catch((error) => {
          console.log(">>> submitUnstake endStake error:", error);
          const message = getStakeError(error);
          handleError(error, message);
        });
      return;
    }
  };

  const title = formType === "stake" ? "Stake" : "Unstake";

  return (
    <>
      <div className="w-[400px] shadow-lg bg-purple-100 rounded-lg p-6">
        <h1 className="text-center font-title text-lg font-bold mb-6">
          {title}
        </h1>
        <div className="flex justify-between mb-4">
          <span className="text-base">Balance:</span>
          <span className="text-base font-bold">
            {format(balance)} <span className="text-sm">EDU</span>
          </span>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full p-3 rounded-md bg-neutral-50 text-right"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[25, 50, 75, 100].map((percentage) => (
            <button
              key={percentage}
              onClick={() =>
                balance &&
                setAmount(
                  formatEther((balance * BigInt(percentage)) / BigInt(100)),
                )
              }
              className="border-2 border-purple-600 text-purple-600 rounded-md py-2"
            >
              {percentage === 100 ? "Max" : `${percentage}%`}
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-x-2">
          {!isSufficientAllowance && formType === "stake" && (
            <button
              onClick={() => {
                approve({
                  address: ADDRESS_TOKEN_STAKING,
                  args: [ADDRESS_POOL, parseEther(amount)],
                });
              }}
              className="bg-purple-600 text-white py-2 px-6 rounded-full"
            >
              Approve
            </button>
          )}
          <button
            onClick={submitForm}
            disabled={
              !(isValid && (formType === "unstake" || isSufficientAllowance))
            }
            className={`bg-purple-600 text-white py-2 px-6 rounded-full ${
              !(isValid && (formType === "unstake" || isSufficientAllowance))
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {title}
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateStakeForm;
