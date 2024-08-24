import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";

import { myWeb3 } from "../web3/provider";
import { getAccount, shortenAccount } from "../web3/utils";

const Header = () => {
  return (
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-lg font-semibold text-gray-800">State Edu</div>
      <ConnectButton />
    </div>
  );
};

export default Header;
