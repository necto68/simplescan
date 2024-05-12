import { chainConfigs, chainConfigMap } from "@/constants/chainConfigs";

export const getChainConfig = (chainId: string) => {
  const chainConfig = chainConfigMap.get(chainId);

  if (!chainConfig) {
    return chainConfigs[0];
  }

  return chainConfig;
};
