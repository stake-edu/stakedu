import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { calculateReward, endStake } from "../web3/stakes";
import { convertHMS } from "../web3/utils";

interface StakeInfoProps {
  id: number;
  from: number;
  to?: number;
  amount: number;
  rewardPaid?: number;
  stakeUpdated: () => void;
}

const StakeInfo: React.FC<StakeInfoProps> = (props) => {
  console.log(">>> StakeInfo: ", props);
  const [reward, setReward] = useState<number>(0);

  const endStakeButtonPressed = (stakeId: number) => {
    console.log("endStakeButtonPressed stakeId: ", stakeId);
    endStake(stakeId)
      .then((result) => {
        console.log("endStakeButtonPressed result: ", result);
        props.stakeUpdated();
      })
      .catch((error) => {
        console.log("endStakeButtonPressed result: ", error);
      });
  };

  useEffect(() => {
    if (props.to === undefined) {
      console.log("rewardInfo calculateReward props.id: ", props.id);

      calculateReward(props.id)
        .then((result) => {
          console.log("rewardInfo calculateReward result: ", result);
          setReward(result.reward);
        })
        .catch((error) => {
          console.log("rewardInfo error: ", error);
        });
    }
  }, [props.id, props.to]);

  const from = new Date(props.from * 1000).toLocaleDateString();

  const to =
    props.to === undefined ? (
      <Button
        type="button"
        name="end stake"
        variant="outline-primary"
        onClick={() => {
          endStakeButtonPressed(props.id);
        }}
      >
        End Stake
      </Button>
    ) : (
      new Date(props.to * 1000).toLocaleDateString()
    );

  const period = props.to ? convertHMS(props.to - props.from) : undefined;

  const amount = props.amount;

  return (
    <tr key={props.id} style={{ textAlign: "center" }}>
      <td style={{ textAlign: "center" }}>{props.id}</td>
      <td style={{ textAlign: "center" }}>{from}</td>
      <td style={{ textAlign: "center" }}>{to}</td>
      {period && <td>{period}</td>}
      <td style={{ textAlign: "right" }}>{amount} Cake-LP</td>
      <td style={{ textAlign: "right" }}>
        {props.to ? props.rewardPaid : reward} ETB
      </td>
    </tr>
  );
};

export default StakeInfo;
