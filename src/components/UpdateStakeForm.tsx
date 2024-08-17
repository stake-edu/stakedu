import React from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

import { approve, getAllowance } from "../web3/cake_lp";
import { endStake, startStake } from "../web3/stakes";

interface UpdateStakeFormProps {
  formType: "stake" | "unstake";
  balance: string;
  handleSuccess: (message: string) => void;
  handleError: (error: Error, message: string) => void;
}

interface UpdateStakeFormState {
  amount: string;
  validAmount: boolean;
  sufficientAllowance: boolean;
  error?: string;
}

export default class UpdateStakeForm extends React.Component<
  UpdateStakeFormProps,
  UpdateStakeFormState
> {
  constructor(props: UpdateStakeFormProps) {
    super(props);
    this.state = {
      amount: "",
      validAmount: false,
      sufficientAllowance: false,
    };
  }

  setAmount = (perc: number): void => {
    const amount = Math.floor(Number(this.props.balance) * perc) / 100;
    const isValid = !isNaN(amount) && amount > 0;
    this.setState({
      validAmount: isValid,
      amount: isNaN(amount) ? "" : amount.toString(),
    });
  };

  updateAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = this.parseAmount(e.target.value);
    const isValid = !isNaN(value) && value >= 0;

    this.setState({
      validAmount: isValid,
      amount: e.target.value,
    });

    if (isValid) {
      this.checkAllowance(value).then((allowanceOk) => {
        this.setState({ sufficientAllowance: allowanceOk });
      });
    }
  };

  allowButtonPressed = async (): Promise<void> => {
    const amount = Number(this.state.amount);
    await approve(amount).then(() => {
      this.checkAllowance(amount).then((allowanceOk) => {
        this.setState({ sufficientAllowance: allowanceOk });
      });
    });
  };

  checkAllowance = (amount: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      getAllowance()
        .then((allowance) => {
          const allowanceOk = amount <= allowance;
          resolve(allowanceOk);
        })
        .catch((error) => {
          console.error("Error checking allowance", error);
          reject(error);
        });
    });
  };

  submitForm = (): void => {
    if (this.props.formType === "stake") {
      this.submitStake();
    } else if (this.props.formType === "unstake") {
      this.submitUnstake();
    }
  };

  submitStake = (): void => {
    const { amount, sufficientAllowance, validAmount } = this.state;

    if (!sufficientAllowance) {
      this.setState({ error: "Insufficient token allowance" });
      return;
    }
    if (!validAmount) {
      this.setState({ error: "Invalid token amount" });
      return;
    }
    const value = Number(amount);

    startStake(value)
      .then((result) => {
        this.props.handleSuccess(
          `Stake increased. Transaction id: ${result.tx}`,
        );
      })
      .catch((error: Error) => {
        console.log(">>> onSubmit startStake error:", error);
        const message = this.getStakeError(error);
        this.props.handleError(error, message);
      });
  };

  submitUnstake = (): void => {
    const { amount, validAmount } = this.state;
    if (!validAmount) {
      this.setState({ error: "Invalid token amount" });
      return;
    }
    const value = Number(amount);

    endStake(value)
      .then((result) => {
        this.props.handleSuccess(
          `Stake decreased. Transaction id: ${result.tx}`,
        );
      })
      .catch((error: Error) => {
        console.log(">>> submitUnstake endStake error:", error);
        const message = this.getStakeError(error);
        this.props.handleError(error, message);
      });
  };

  getStakeError = (error: Error): string => {
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

  parseAmount = (amount: string): number => {
    return Math.floor(Number(amount) * 100) / 100;
  };

  render() {
    const { formType, balance } = this.props;

    const title = formType === "stake" ? "Stake" : "Unstake";

    return (
      <div>
        <h3 className="text-center">{title}</h3>

        <Form className="p-4">
          <Form.Group controlId="stakeAmount">
            <Form.Label
              variant="secondary"
              className="w-100 text-end text-muted"
            >
              Balance: {balance}
            </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="0.0"
                autoComplete="off"
                value={this.state.amount}
                title="balance not staked"
                onChange={this.updateAmount}
              />
              <InputGroup.Text> Cake-LP </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Container>
            <Row>
              <Col className="m-0 p-2">
                <Button
                  onClick={() => this.setAmount(25)}
                  className="w-100"
                  variant="outline-secondary"
                >
                  25%
                </Button>
              </Col>
              <Col className="m-0 p-2">
                <Button
                  onClick={() => this.setAmount(50)}
                  className="w-100"
                  variant="outline-secondary"
                >
                  50%
                </Button>
              </Col>
              <Col className="m-0 p-2">
                <Button
                  onClick={() => this.setAmount(75)}
                  className="w-100"
                  variant="outline-secondary"
                >
                  75%
                </Button>
              </Col>
              <Col className="m-0 p-2">
                <Button
                  onClick={() => this.setAmount(100)}
                  className="w-100"
                  variant="outline-secondary"
                >
                  Max
                </Button>
              </Col>
            </Row>
          </Container>

          <div style={{ textAlign: "center" }} className="mt-4">
            {this.state.validAmount &&
              !this.state.sufficientAllowance &&
              formType === "stake" && (
                <Button
                  name="allow"
                  type="button"
                  variant="primary w-50"
                  onClick={this.allowButtonPressed}
                  className="pl-2"
                >
                  Allow LP token transfer
                </Button>
              )}
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="primary w-25"
              onClick={this.submitForm}
              disabled={
                !(
                  this.state.validAmount &&
                  (formType === "unstake" || this.state.sufficientAllowance)
                )
              }
            >
              {title}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
