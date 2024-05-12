import { getChainConfig } from "@/helpers/getChainConfig";
import { RawTransaction } from "@/types/RawTransaction";
import axios from "axios";
import { getExplorerApiKey } from "@/helpers/getExplorerApiKey";

export const getRawTransactionByHash = async (
  chainId: string,
  hash: string,
) => {
  const { apiURL } = getChainConfig(chainId);
  const apiKey = getExplorerApiKey(chainId);

  // etherscan-ts does not support proxy module properly
  // so need to use axios to fetch data
  const params = {
    module: "proxy",
    action: "eth_getTransactionByHash",
    txhash: hash,
    apiKey,
  };

  const res = await axios.get(apiURL, {
    params,
  });

  const json = await res.data;
  const { result } = json;

  if (result && !result.code) {
    return result as RawTransaction;
  }

  return null;
};
