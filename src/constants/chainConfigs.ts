import { ChainConfig } from "@/types/ChainConfig";

// can be extended to support more chains
export const chainConfigs: ChainConfig[] = [
  {
    chainId: "1",
    title: "mainnet",
    symbol: "ETH",
    explorerURL: "https://etherscan.io",
    apiURL: "https://api.etherscan.io/api",
  },
  {
    chainId: "137",
    title: "polygon",
    symbol: "MATIC",
    explorerURL: "https://polygonscan.com",
    apiURL: "https://api.polygonscan.com/api",
  },
];

export const chainConfigMap = new Map(
  chainConfigs.map((config) => [config.chainId, config]),
);
