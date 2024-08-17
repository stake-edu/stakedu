import React from "react";

interface RewardPhaseInfoProps {
  id: number;
  from: number;
  to: number;
  reward: number;
  totalStaked: number;
}

const RewardPhaseInfo: React.FC<RewardPhaseInfoProps> = ({
  id,
  from,
  to,
  reward,
  totalStaked,
}) => {
  const fromDate = new Date(from * 1000);
  const toDate = to ? new Date(to * 1000) : undefined;

  const fromString =
    fromDate.toLocaleDateString() + " " + fromDate.toLocaleTimeString();
  const toString = toDate
    ? toDate.toLocaleDateString() + " " + toDate.toLocaleTimeString()
    : "";

  const rewardPerSec = Math.round((reward * 100000) / (to - from)) / 100000;

  return (
    <tr key={id}>
      <td style={{ textAlign: "center" }}> {id} </td>
      <td style={{ textAlign: "center" }}> {fromString} </td>
      <td style={{ textAlign: "center" }}> {toString} </td>
      <td style={{ textAlign: "right" }}> {reward} ETB</td>
      <td style={{ textAlign: "right" }}> {rewardPerSec} ETB/s </td>
      <td style={{ textAlign: "right" }}> {totalStaked} ETB </td>
    </tr>
  );
};

export default RewardPhaseInfo;
