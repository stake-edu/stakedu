import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import { Center, Wrapped } from "../components/Layout";
import { claimReward } from "../web3/stakes";
import Modal from "./Modal";
import RewardsInfo from "./RewardsInfo";
import TitleValueBox from "./TitleValueBox";
import UpdateStakeForm from "./UpdateStakeForm";

interface RewardPeriod {
  totalStaked: number;
}

interface StakeViewProps {
  lpUnstaked: number;
  lpStaked: number;
  claimableRewards: number;
  rewardsPaid: number;
  rewardRate: number;
  totalRewardsPaid: number;
  formType?: "stake" | "unstake";
  rewardPerdiod: RewardPeriod;
  handleSuccess: (message: string) => void;
  handleError: (error: Error) => void;
  allowanceUpdated: () => void;
}

interface StakeViewState extends StakeViewProps {
  showUpdateStakeModal: boolean;
}

export default class StakeView extends React.Component<
  StakeViewProps,
  StakeViewState
> {
  constructor(props: StakeViewProps) {
    super(props);

    this.state = {
      ...props,
      showUpdateStakeModal: false,
    };
  }

  componentDidUpdate(prevProps: StakeViewProps): void {
    if (
      prevProps.lpUnstaked !== this.props.lpUnstaked ||
      prevProps.lpStaked !== this.props.lpStaked ||
      prevProps.claimableRewards !== this.props.claimableRewards ||
      prevProps.rewardsPaid !== this.props.rewardsPaid ||
      prevProps.rewardRate !== this.props.rewardRate ||
      prevProps.totalRewardsPaid !== this.props.totalRewardsPaid ||
      prevProps.formType !== this.props.formType ||
      prevProps.rewardPerdiod.totalStaked !==
        this.props.rewardPerdiod.totalStaked
    ) {
      this.setState({
        lpUnstaked: this.props.lpUnstaked,
        lpStaked: this.props.lpStaked,
        claimableRewards: this.props.claimableRewards,
        rewardsPaid: this.props.rewardsPaid,
        rewardRate: this.props.rewardRate,
        totalRewardsPaid: this.props.totalRewardsPaid,
        formType: this.props.formType,
        rewardPerdiod: this.props.rewardPerdiod,
      });
    }
  }

  claimRewardPressed = (): void => {
    claimReward()
      .then((result) => {
        this.props.handleSuccess(
          `Reward claimed. Transaction id: ${result.tx}`,
        );
      })
      .catch((error: Error) => {
        this.props.handleError(error);
      });
  };

  showUpdateStakeModalPreseed = (buttonType: "stake" | "unstake"): void => {
    this.setState({
      showUpdateStakeModal: true,
      formType: buttonType,
    });
  };

  hideUpdateStakeModalPreseed = (): void => {
    this.setState({
      showUpdateStakeModal: false,
      formType: undefined,
    });
  };

  handleAllowanceUpdated = (): void => {
    this.props.allowanceUpdated();
  };

  handleSuccess = (): void => {
    this.hideUpdateStakeModalPreseed();
    this.props.handleSuccess("Operation successful");
  };

  handleError = (error: Error): void => {
    this.hideUpdateStakeModalPreseed();
    this.props.handleError(error);
  };

  render(): React.ReactNode {
    const {
      showUpdateStakeModal,
      formType,
      lpUnstaked,
      lpStaked,
      claimableRewards,
      rewardsPaid,
      rewardRate,
      totalRewardsPaid,
    } = this.state;

    const mySharePerc =
      lpStaked && this.state.rewardPerdiod.totalStaked > 0
        ? Math.round(
            (lpStaked * 10000) / this.state.rewardPerdiod.totalStaked,
          ) / 100
        : 0;

    return (
      <div>
        <Wrapped>
          <Card style={{ flex: 1, minWidth: 200, margin: 10 }}>
            <Card.Title className="p-2">Total LP Tokens Staked</Card.Title>
            <Card.Body> {this.state.rewardPerdiod.totalStaked} ETB </Card.Body>
          </Card>
          <Card style={{ flex: 1, minWidth: 200, margin: 10 }}>
            <Card.Title className="p-2">My LP Tokens Staked</Card.Title>
            <Card.Body> {lpStaked} </Card.Body>
          </Card>
          <Card style={{ flex: 1, minWidth: 200, margin: 10 }}>
            <Card.Title className="p-2">My pool share</Card.Title>
            <Card.Body> {mySharePerc}%</Card.Body>
          </Card>
          <Card style={{ flex: 1, minWidth: 200, margin: 10 }}>
            <Card.Title className="p-2">My Rewards Received</Card.Title>
            <Card.Body>{rewardsPaid} ETB</Card.Body>
          </Card>
        </Wrapped>

        <div className="mt-4"></div>

        <Center maxWidth="500">
          <TitleValueBox
            title="Balance not staked yet"
            value={lpUnstaked}
            symbol="Cake-LP"
          />

          <div className="mt-4"></div>

          <Container>
            <Row>
              <Col>
                <Button
                  name="stake"
                  className="w-100"
                  variant="primary"
                  onClick={() => this.showUpdateStakeModalPreseed("stake")}
                >
                  Stake
                </Button>
              </Col>
              <Col>
                <Button
                  name="unstake"
                  className="w-100"
                  variant="secondary"
                  onClick={() => this.showUpdateStakeModalPreseed("unstake")}
                >
                  Unstake
                </Button>
              </Col>
            </Row>
          </Container>

          <div className="mt-4"></div>

          <RewardsInfo
            rewardRate={rewardRate}
            totalRewardsPaid={totalRewardsPaid}
          />

          <div className="mt-4"></div>

          <TitleValueBox
            title="Claimable rewards"
            value={claimableRewards}
            symbol="ETB"
          />

          <div className="mt-2"></div>

          <div className="d-grid gap-2">
            <Button
              name="claim"
              style={{ minWidth: 200 }}
              variant="primary"
              onClick={() => this.claimRewardPressed()}
            >
              Claim rewards
            </Button>
          </div>

          {showUpdateStakeModal && (
            <Modal onClose={() => this.hideUpdateStakeModalPreseed()}>
              <UpdateStakeForm
                formType={formType}
                handleSuccess={() => this.handleSuccess()}
                handleError={(error: Error) => this.handleError(error)}
                allowanceUpdated={() => this.handleAllowanceUpdated()}
                balance={
                  formType === "stake"
                    ? this.state.lpUnstaked
                    : formType === "unstake"
                      ? this.state.lpStaked
                      : 0
                }
              />
            </Modal>
          )}
        </Center>
      </div>
    );
  }
}
