import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { approve, getAllowance } from "../web3/etb";
import { createRewardPeriod } from "../web3/reward_phases";

interface CreateRewardPhaseFormProps {
  startDate?: number;
  allowanceUpdated: () => void;
  handleSuccess: (message: string) => void;
  handleError: (error: Error, message: string) => void;
}

interface CreateRewardPhaseFormState {
  sufficientAllowance: boolean;
  validAmount: boolean;
  startDate: Date;
  endDate: Date;
  amount: string;
  error?: string;
}

export default class CreateRewardPhaseForm extends React.Component<
  CreateRewardPhaseFormProps,
  CreateRewardPhaseFormState
> {
  constructor(props: CreateRewardPhaseFormProps) {
    super(props);

    let start =
      (props.startDate && new Date((props.startDate + 1) * 1000)) || new Date();
    let end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);

    this.state = {
      sufficientAllowance: false,
      validAmount: false,
      startDate: start,
      endDate: end,
      amount: "",
    };
  }

  updateAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    let isValid = !isNaN(value) && value > 0;

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

  updateDate = (fieldName: "startDate" | "endDate", date: Date | null) => {
    if (date) {
      this.setState({ [fieldName]: date } as Pick<
        CreateRewardPhaseFormState,
        "startDate" | "endDate"
      >);
    }
  };

  allowButtonPressed = async () => {
    const amount = parseInt(this.state.amount);
    await approve(amount);

    this.checkAllowance(amount).then((allowanceOk) => {
      this.setState({ sufficientAllowance: allowanceOk });
    });

    this.props.allowanceUpdated();
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

  submitForm = () => {
    const { amount, startDate, endDate, sufficientAllowance, validAmount } =
      this.state;

    if (!sufficientAllowance) {
      this.setState({ error: "Insufficient token allowance" });
      return;
    }
    if (!validAmount) {
      this.setState({ error: "Invalid token amount" });
      return;
    }
    const value = parseInt(amount);

    createRewardPeriod(value, startDate, endDate)
      .then((result) => {
        this.props.handleSuccess(
          `New reward phase created. Transaction id: ${result.tx}`,
        );
      })
      .catch((error: Error) => {
        console.log("Error 2 createRewardPhase:", error);
        const message = this.getRewardPeriodError(error);
        this.props.handleError(error, message);
      });
  };

  getRewardPeriodError = (error: Error): string => {
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

  render() {
    return (
      <div className="p-2">
        <h3>New Reward Phase</h3>

        <Form>
          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <DatePicker
              name="startDate"
              className="form-control datepicker"
              autoComplete="off"
              onChange={(date: Date | null) =>
                this.updateDate("startDate", date)
              }
              dateFormat="yyyy-MM-dd"
              selected={this.state.startDate}
            />
            <Form.Text className="text-muted">
              The date the reward phase starts
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <DatePicker
              name="endDate"
              className="form-control datepicker"
              autoComplete="off"
              onChange={(date: Date | null) => this.updateDate("endDate", date)}
              dateFormat="yyyy-MM-dd"
              selected={this.state.endDate}
            />
            <Form.Text className="text-muted">
              The date the reward phase ends
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="rewardAmount">
            <Form.Label>Amount</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                style={{ maxWidth: 200 }}
                type="text"
                placeholder="0.0"
                autoComplete="off"
                title="Amount"
                onChange={this.updateAmount}
              />
              <InputGroup.Text> ETB </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <div style={{ textAlign: "center" }} className="pt-2">
            {this.state.validAmount && !this.state.sufficientAllowance && (
              <Button
                name="allow"
                type="button"
                variant="outline-primary"
                onClick={this.allowButtonPressed}
                className="pl-2"
              >
                Allow ETB token transfer
              </Button>
            )}
            &nbsp;&nbsp;&nbsp;
            <Button
              variant="outline-primary"
              onClick={this.submitForm}
              disabled={
                !(this.state.validAmount && this.state.sufficientAllowance)
              }
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
