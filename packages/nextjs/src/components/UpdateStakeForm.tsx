import React, { useState } from "react";
import { formatEther, parseEther } from "viem";

import { ADDRESS_POOL, ADDRESS_TOKEN_STAKING } from "../consts";
import {
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

  const { writeContractAsync: unstake } =
    useWriteStakingRewardPoolEndStakeAndWithdraw();

  const { writeContractAsync: stake } =
    useWriteStakingPoolDepositAndStartStake();

  const isValid =
    amount !== "" &&
    balance !== undefined &&
    !Number.isNaN(Number(amount)) &&
    parseEther(amount) <= balance;

  const approve = (args: any) => {};
  const isSufficientAllowance = true;
  // const account = useAccount();
  // const allowance = useReadErc20Allowance({
  //   address: ADDRESS_TOKEN_STAKING,
  //   args: [account.address!, ADDRESS_POOL],
  // });
  // const { writeContractAsync: approve } = useWriteErc20Approve();
  // const isSufficientAllowance =
  //   allowance?.data !== undefined &&
  //   !Number.isNaN(Number(amount)) &&
  //   allowance?.data >= parseEther(amount);

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
        value: value!,
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
      <div className="w-[520px] rounded bg-purple-100 p-12 shadow-lg">
        <h1 className="font-title mb-6 text-center text-lg font-bold">
          {title}
        </h1>
        <div className="mb-4 flex justify-between">
          <span className="font-semibold">Balance:</span>
          <span className="text-base font-bold">
            <span className="font-semibold text-purple-800">
              {format(balance)}
            </span>
            <span className="ml-2 pr-3 text-sm font-normal">EDU</span>
          </span>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full rounded-md bg-neutral-50 p-3 pr-12 text-right"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm">
            <span className="">EDU</span>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((percentage) => (
            <button
              key={percentage}
              onClick={() =>
                balance &&
                setAmount(
                  formatEther((balance * BigInt(percentage)) / BigInt(100)),
                )
              }
              className="rounded-md border-2 border-purple-600 bg-purple-100 py-2 font-semibold text-purple-600"
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
              className="w-1/2 rounded-md bg-purple-600 px-6 py-2 font-semibold text-white"
            >
              Approve
            </button>
          )}
          <button
            onClick={submitForm}
            disabled={
              !(isValid && (formType === "unstake" || isSufficientAllowance))
            }
            className={`w-1/2 rounded-md bg-purple-600 px-6 py-2 text-white font-semibold${
              !(isValid && (formType === "unstake" || isSufficientAllowance))
                ? "cursor-not-allowed opacity-50"
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
