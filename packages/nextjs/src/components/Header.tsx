import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import logo from "../../public/logo.png";

const Header = () => {
  return (
    <div className="mx-auto flex h-1 max-w-screen-xl items-center px-2 py-6 pt-12">
      <div className="h-4 flex-1">
        <Image src={logo} alt="logo" height={30} />
      </div>
      <div className="flex flex-none items-center">
        <Link
          href="https://docs.stakedu.com"
          className="mr-4 text-sm font-semibold"
        >
          🔗 Docs
        </Link>
        <ConnectButton showBalance={false} />
      </div>
    </div>
  );
};

export default Header;
