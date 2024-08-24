import React, { useEffect, useState } from "react";

import { approve, getAllowance } from "../web3/cake_lp";
import { endStake, startStake } from "../web3/stakes";

const UpdateStakeForm: React.FC<{
  formType: "stake" | "unstake";
  balance: string;
  handleSuccess: (message: string) => void;
  handleError: (error: any, message: string) => void;
}> = ({ formType, balance, handleSuccess, handleError }) => {
  const [amount, setAmount] = useState("");
  const [validAmount, setValidAmount] = useState(false);
  const [sufficientAllowance, setSufficientAllowance] = useState(false);

  const setAmountPercentage = (perc: number) => {
    const calculatedAmount = Math.floor(Number(balance) * perc) / 100;
    const isValid = !isNaN(calculatedAmount) && calculatedAmount > 0;
    setValidAmount(isValid);
    setAmount(isNaN(calculatedAmount) ? "" : calculatedAmount.toString());
  };

  const allowButtonPressed = async () => {
    const numAmount = Number(amount);
    await approve(numAmount);
    const allowanceOk = await checkAllowance(numAmount);
    setSufficientAllowance(allowanceOk);
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

  const submitForm = () => {
    if (formType === "stake") {
      submitStake();
    } else if (formType === "unstake") {
      submitUnstake();
    }
  };

  const submitStake = () => {
    if (!sufficientAllowance) {
      return;
    }
    if (!validAmount) {
      return;
    }
    const value = Number(amount);

    startStake(value)
      .then((result) => {
        handleSuccess(`Stake increased. Transaction id: ${result.tx}`);
      })
      .catch((error) => {
        console.log(">>> onSubmit startStake error:", error);
        const message = getStakeError(error);
        handleError(error, message);
      });
  };

  const submitUnstake = () => {
    if (!validAmount) {
      return;
    }
    const value = Number(amount);

    endStake(value)
      .then((result) => {
        handleSuccess(`Stake decreased. Transaction id: ${result.tx}`);
      })
      .catch((error) => {
        console.log(">>> submitUnstake endStake error:", error);
        const message = getStakeError(error);
        handleError(error, message);
      });
  };

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
            {balance} <span className="text-sm">EDU</span>
          </span>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full p-3 rounded-md bg-neutral-50 text-right"
            value={amount + " EDU"}
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[25, 50, 75, 100].map((percentage) => (
            <button
              key={percentage}
              onClick={() => setAmountPercentage(percentage)}
              className="border-2 border-purple-600 text-purple-600 rounded-md py-2"
            >
              {percentage === 100 ? "Max" : `${percentage}%`}
            </button>
          ))}
        </div>
        <div className="text-center">
          {validAmount && !sufficientAllowance && formType === "stake" && (
            <button
              onClick={allowButtonPressed}
              className="bg-purple-600 text-white py-2 px-6 rounded-full"
            >
              Allow LP token transfer
            </button>
          )}
          <button
            onClick={submitForm}
            disabled={
              !(validAmount && (formType === "unstake" || sufficientAllowance))
            }
            className={`bg-purple-600 text-white py-2 px-6 rounded-full ${
              !(validAmount && (formType === "unstake" || sufficientAllowance))
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
