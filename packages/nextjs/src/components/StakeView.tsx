import React, { useState } from "react";

import Modal from "./Modal";
import UpdateStakeForm from "./UpdateStakeForm";

interface StakeViewProps {
  lpUnstaked: bigint | undefined;
  lpStaked: bigint | undefined;
  handleSuccess: () => void;
  handleError: () => void;
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
      <div className="flex space-x-4 justify-center">
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-md"
          onClick={() => setModalOpen("stake")}
        >
          Stake
        </button>
        <button
          onClick={() => setModalOpen("unstake")}
          className="border-2 border-purple-600 text-purple-600 py-2 px-4 rounded-md"
        >
          Unstake
        </button>
      </div>

      {modalOpen !== undefined && (
        <Modal onClose={() => setModalOpen(undefined)}>
          <UpdateStakeForm
            formType={modalOpen}
            handleSuccess={() => {
              setModalOpen(undefined);
              handleSuccess();
            }}
            handleError={() => {
              setModalOpen(undefined);
              handleError();
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
