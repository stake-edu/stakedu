import { formatEther } from "viem";

export const format = (value: bigint | undefined) => {
  if (value === undefined) {
    return "-";
  }
  return formatEther(value).slice(0, 6);
};
