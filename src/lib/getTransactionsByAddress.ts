import { Etherscan } from "etherscan-ts";
import { getChainConfig } from "@/helpers/getChainConfig";
import { Transaction } from "@/types/Transaction";
import { getExplorerApiKey } from "@/helpers/getExplorerApiKey";

export const getTransactionsByAddress = async (
  chainId: string,
  address: string,
) => {
  const { apiURL } = getChainConfig(chainId);
  const apiKey = getExplorerApiKey(chainId);

  const explorerAPI = new Etherscan(apiKey, apiURL);

  try {
    const { result } = await explorerAPI.getTrxList(
      address,
      0,
      999999999,
      1,
      100,
      "desc",
    );

    return result as Transaction[];
  } catch {
    return [];
  }
};
