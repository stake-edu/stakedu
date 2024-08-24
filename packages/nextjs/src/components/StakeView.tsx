import React, { useState } from "react";

import Modal from "./Modal";
import UpdateStakeForm from "./UpdateStakeForm";

interface StakeViewProps {
  lpUnstaked: bigint | undefined;
  lpStaked: bigint | undefined;
  handleSuccess: (message: string) => void;
  handleError: (error: Error, message?: string) => void;
}

const StakeView: React.FC<StakeViewProps> = ({
  lpUnstaked,
  lpStaked,
  handleSuccess,
  handleError,
}) => {
  const [modalOpen, setModalOpen] = useState<"stake" | "unstake" | undefined>(
    undefined,
  );

  return (
    <>
      <div className="flex justify-between space-x-4">
        <button
          className="w-2/4 rounded-md bg-purple-600 px-4 py-2 font-semibold text-white"
          onClick={() => setModalOpen("stake")}
        >
          Stake
        </button>
        <button
          className="w-2/4 rounded-md border-2 border-purple-600 bg-purple-50 px-4 py-2 font-semibold text-purple-600"
          onClick={() => setModalOpen("unstake")}
        >
          Unstake
        </button>
      </div>

      {modalOpen !== undefined && (
        <Modal onClose={() => setModalOpen(undefined)}>
          <UpdateStakeForm
            formType={modalOpen}
            handleSuccess={(message: string) => {
              setModalOpen(undefined);
              handleSuccess(message);
            }}
            handleError={(error: Error, message?: string) => {
              setModalOpen(undefined);
              handleError(error, message);
            }}
            balance={
              modalOpen === "stake"
                ? lpUnstaked
                : modalOpen === "unstake"
                  ? lpStaked
                  : undefined
            }
          />
        </Modal>
      )}
    </>
  );
};

export default StakeView;
