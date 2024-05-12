import { Etherscan } from "etherscan-ts";
import { getChainConfig } from "@/helpers/getChainConfig";
import { getExplorerApiKey } from "@/helpers/getExplorerApiKey";

export const getBalanceByAddress = async (chainId: string, address: string) => {
  const { apiURL } = getChainConfig(chainId);
  const apiKey = getExplorerApiKey(chainId);

  const explorerAPI = new Etherscan(apiKey, apiURL);

  const { result } = await explorerAPI.getSingleEtherBalance(address);

  return result as string;
};
