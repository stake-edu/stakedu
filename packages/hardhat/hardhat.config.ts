import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    opencampus: {
      url: `https://rpc.open-campus-codex.gelato.digital/`,
      accounts: [process.env.PRIVATE_KEY!],
      verify: {
        etherscan: {
          apiUrl: "https://opencampus-codex.blockscout.com/api",
          apiKey: "not-needed",
        },
      },
    },
  },
};

export default config;
