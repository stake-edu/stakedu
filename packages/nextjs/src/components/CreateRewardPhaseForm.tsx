import React, { useState } from "react";

import { approve, getAllowance } from "../web3/etb";
import { createRewardPeriod } from "../web3/reward_phases";

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
  const [sufficientAllowance, setSufficientAllowance] = useState(false);
  const [validAmount, setValidAmount] = useState(false);
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
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const updateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isValid = !isNaN(value) && value > 0;

    setValidAmount(isValid);
    setAmount(e.target.value);

    if (isValid) {
      checkAllowance(value).then(setSufficientAllowance);
    }
  };

  const checkAllowance = async (amount: number): Promise<boolean> => {
    try {
      const allowance = await getAllowance();
      return amount <= allowance;
    } catch (error) {
      console.error("Error checking allowance", error);
      return false;
    }
  };

  const allowButtonPressed = async () => {
    const amountValue = parseInt(amount);
    await approve(amountValue);
    const allowanceOk = await checkAllowance(amountValue);
    setSufficientAllowance(allowanceOk);
  };

  const submitForm = async () => {
    if (!sufficientAllowance) {
      setError("Insufficient token allowance");
      return;
    }
    if (!validAmount) {
      setError("Invalid token amount");
      return;
    }
    const value = parseInt(amount);

    try {
      const result = await createRewardPeriod(
        value,
        new Date(start),
        new Date(end),
      );
      handleSuccess(`New reward phase created. Transaction id: ${result.tx}`);
    } catch (error) {
      console.error("Error creating reward phase:", error);
      const message = getRewardPeriodError(error);
      handleError(error, message);
    }
  };

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
              onChange={updateAmount}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">ETB</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {validAmount && !sufficientAllowance && (
            <button
              type="button"
              onClick={allowButtonPressed}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Allow ETB token transfer
            </button>
          )}
          <button
            type="button"
            onClick={submitForm}
            disabled={!(validAmount && sufficientAllowance)}
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
