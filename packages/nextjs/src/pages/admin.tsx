import React, { useState } from "react";

import { AlertDismissible } from "../components/AlertDismissible";
import CreateRewardPhaseForm from "../components/CreateRewardPhaseForm";
import Header from "../components/Header";
import Modal from "../components/Modal";
import RewardPhaseTable from "../components/RewardPhasesTable";
import { ADDRESS_POOL } from "../consts";
import {
  useReadStakingRewardPoolGetRewardPeriodsCount,
  useReadStakingRewardPoolRewardPeriods,
} from "../hooks/generated";

interface InfoState {
  title: string;
  detail: string;
}

const AdminPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<InfoState | null>(null);

  const periodsCount = useReadStakingRewardPoolGetRewardPeriodsCount({
    address: ADDRESS_POOL,
  });

  const lastPeriod = useReadStakingRewardPoolRewardPeriods({
    address: ADDRESS_POOL,
    args: [(periodsCount?.data && periodsCount.data - BigInt(1))!],
  });

  return (
    <>
      <Header />

      <div className="mx-auto max-w-[1000px] p-0">
        {error && (
          <AlertDismissible variant="error" title="Error">
            {error}
          </AlertDismissible>
        )}
        {info && (
          <AlertDismissible variant="info" title={info.title}>
            {info.detail}
          </AlertDismissible>
        )}
      </div>

      <RewardPhaseTable />

      <div className="text-center">
        <button
          className="rounded-full bg-purple-600 px-6 py-2 text-white"
          onClick={() => setModalOpen(true)}
        >
          Create New Reward Phase
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <CreateRewardPhaseForm
            handleSuccess={(result: string) => {
              console.log("Submit successful:", result);
              setInfo({
                title: "Success!",
                detail: result,
              });
            }}
            handleError={(error: Error | string, message?: string) => {
              console.error("Error occurred:", error, message);
              setError(
                message ||
                  (error instanceof Error ? error.message : String(error)),
              );
            }}
            startDate={Number(lastPeriod?.data?.to)}
          />
        </Modal>
      )}
    </>
  );
};

export default AdminPage;
