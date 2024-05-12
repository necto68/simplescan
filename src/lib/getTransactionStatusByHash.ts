import { Etherscan } from "etherscan-ts";
import { getChainConfig } from "@/helpers/getChainConfig";
import { TransactionStatus } from "@/types/TransactionStatus";
import { getExplorerApiKey } from "@/helpers/getExplorerApiKey";

export const getTransactionStatusByHash = async (
  chainId: string,
  hash: string,
) => {
  const { apiURL } = getChainConfig(chainId);
  const apiKey = getExplorerApiKey(chainId);

  const explorerAPI = new Etherscan(apiKey, apiURL);

  try {
    const { result } = await explorerAPI.checkTransactionReceiptStatus(hash);

    return result as TransactionStatus;
  } catch {
    return null;
  }
};
