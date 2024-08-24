import { defineConfig } from '@wagmi/cli';
import { erc20Abi } from 'viem';
import { hardhat, react } from "@wagmi/cli/plugins"

export default defineConfig({
  out: '../nextjs/src/hooks/generated.ts',
  contracts: [{
    name: "erc20",
    abi: erc20Abi,
  }],
  plugins: [
    react(),
    hardhat({
      exclude: [
        "@openzeppelin/**",
      ],
      project: "."
    })
  ],
})
