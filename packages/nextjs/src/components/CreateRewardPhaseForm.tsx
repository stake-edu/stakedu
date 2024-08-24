import React, { useState } from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

import { ADDRESS_POOL, ADDRESS_TOKEN_REWARD } from "../consts";
import {
  useReadErc20Allowance,
  useWriteErc20Approve,
  useWriteStakingRewardPoolNewRewardPeriod,
} from "../hooks/generated";

interface CreateRewardPhaseFormProps {
  startDate?: number;
  handleSuccess: (result: string) => void;
  handleError: (error: Error | string, message?: string) => void;
}

const CreateRewardPhaseForm: React.FC<CreateRewardPhaseFormProps> = ({
  startDate,
  handleSuccess,
  handleError,
}) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [start, setStart] = useState<string>(
    startDate
      ? new Date((startDate + 1) * 1000).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  );
  const [end, setEnd] = useState<string>(
    new Date(new Date(start).getTime() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  );

  const account = useAccount();
  const allowance = useReadErc20Allowance({
    address: ADDRESS_TOKEN_REWARD,
    args: [account.address!, ADDRESS_POOL],
  });
  const { writeContractAsync: approve } = useWriteErc20Approve();
  const { writeContractAsync: createRewardPeriod } =
    useWriteStakingRewardPoolNewRewardPeriod();

  const isValidAmount = parseEther(amount) > BigInt(0);
  const isSufficientAllowance =
    allowance?.data !== undefined && allowance?.data >= parseEther(amount);

  const getRewardPeriodError = (error: any): string => {
    if (typeof error.message !== "string") return "Unknown error";

    switch (true) {
      case error.message.includes("Invalid period start time"):
        return "Invalid period start time";
      case error.message.includes("Invalid reward amount"):
        return "Invalid reward amount";
      case error.message.includes("Invalid reward interval"):
        return "Invalid reward interval";
      default:
        return error.message;
    }
  };

  const submitForm = () => {
    if (!isSufficientAllowance) {
      setError("Insufficient token allowance");
      return;
    }
    if (!isValidAmount) {
      setError("Invalid token amount");
      return;
    }

    createRewardPeriod({
      address: ADDRESS_POOL,
      args: [
        parseEther(amount),
        BigInt(Math.round(new Date(start).getTime() / 1000)),
        BigInt(Math.round(new Date(end).getTime() / 1000)),
      ],
    })
      .then((hash) => {
        handleSuccess(`New reward phase created. Transaction id: ${hash}`);
      })
      .catch((error) => {
        console.error("Error creating reward phase:", error);
        const message = getRewardPeriodError(error);
        handleError(error, message);
      });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">New Reward Phase</h3>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">
            The date the reward phase starts
          </p>
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="mt-1 text-sm text-gray-500">
            The date the reward phase ends
          </p>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              id="amount"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.0"
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">ETB</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {isValidAmount && !isSufficientAllowance && (
            <button
              type="button"
              onClick={() => {
                approve({
                  address: ADDRESS_TOKEN_REWARD,
                  args: [ADDRESS_POOL, parseEther(amount)],
                });
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Approve
            </button>
          )}
          <button
            type="button"
            onClick={submitForm}
            disabled={!(isValidAmount && isSufficientAllowance)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default CreateRewardPhaseForm;
