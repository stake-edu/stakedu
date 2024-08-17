import React from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";

import { getBalance as getBalanceCake } from "../web3/cake_lp";
import { getBalance as getBalanceETB } from "../web3/etb";
import { myWeb3 } from "../web3/provider";
import { getAccount, shortenAccount } from "../web3/utils";
import { Flow } from "./Layout";

interface HeaderProps {
  reload: () => void;
  setAccountConnected: (connected: boolean) => void;
}

interface HeaderState {
  account?: string;
  balanceETB?: string;
  balanceCake?: string;
  blockNumber?: number;
  blockTimestamp?: number;
  error?: string;
}

export default class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {};
    this.handleAccount = this.handleAccount.bind(this);
  }

  componentDidMount() {
    this.reload();

    window.ethereum.on("chainChanged", () => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload();
    });
  }

  reloadPressed = async (): Promise<void> => {
    this.reload();
    this.props.reload(); // reload parent page
  };

  reload = async (): Promise<void> => {
    await this.loadBlockInfo();
    await this.loadAccount();
    await this.loadBalance();
  };

  connect = (): void => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts: string[]) => {
        let account = accounts.length > 0 ? accounts[0] : undefined;
        this.reload();
        this.handleAccount(account);
      });
  };

  handleAccount = (account?: string): void => {
    if (account) {
      this.setState({
        account: shortenAccount(account),
      });
      this.props.setAccountConnected(true);
    } else {
      this.setState({
        account: undefined,
      });
      this.props.setAccountConnected(false);
    }
  };

  loadAccount = (): void => {
    getAccount()
      .then((account) => {
        this.handleAccount(account);
      })
      .catch((error: Error) => {
        this.setState({ error: error.message });
        this.props.setAccountConnected(false);
      });
  };

  loadBalance = (): void => {
    getBalanceETB()
      .then((data) => {
        this.setState({
          balanceETB: data.units,
        });
        return getBalanceCake();
      })
      .then((data) => {
        this.setState({
          balanceCake: data.units,
        });
      })
      .catch((error: Error) => {
        this.setState({ error: error.message });
      });
  };

  loadBlockInfo = (): void => {
    myWeb3.eth.getBlock("latest").then((block) => {
      this.setState({
        blockNumber: block.number,
        blockTimestamp: Number(block.timestamp),
      });
    });
  };

  render() {
    const { balanceETB, balanceCake, blockNumber, blockTimestamp, account } =
      this.state;

    const blockDate = blockTimestamp && new Date(blockTimestamp * 1000);
    const blockDateFormatted =
      (blockDate &&
        `${blockDate.toLocaleDateString()} @ ${blockDate.toLocaleTimeString()}`) ||
      "-";

    return (
      <div className="header">
        <Container fluid>
          <Row>
            <Col>
              <Flow>
                <div>
                  {balanceETB !== undefined && (
                    <h5 className="m-2"> {balanceETB} ETB</h5>
                  )}
                </div>
                <div>
                  {balanceCake !== undefined && (
                    <h5 className="m-2"> {balanceCake} Cake-LP </h5>
                  )}
                </div>
              </Flow>
            </Col>

            <Col xs className="text-end">
              {(account && (
                <DropdownButton
                  id="menu"
                  variant="outline-primary"
                  title={account}
                >
                  <Dropdown.Item eventKey="1" disabled>
                    Block Info
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="2" disabled>
                    number: {blockNumber}{" "}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="3" disabled>
                    date: {blockDateFormatted}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    eventKey="4"
                    onClick={() => this.reloadPressed()}
                  >
                    Reload
                  </Dropdown.Item>
                </DropdownButton>
              )) || (
                <Button
                  name="connect"
                  variant="primary"
                  onClick={() => this.connect()}
                >
                  Connect Wallet
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
