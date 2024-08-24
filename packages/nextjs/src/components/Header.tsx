import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const Header = () => {
  return (
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-lg font-semibold text-gray-800">State Edu</div>
      <ConnectButton />
    </div>
  );
};

export default Header;
