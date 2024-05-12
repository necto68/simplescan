import { getChainConfig } from "@/helpers/getChainConfig";
import { Block } from "@/types/Block";
import axios from "axios";
import { getExplorerApiKey } from "@/helpers/getExplorerApiKey";

export const getBlockByBlockNumber = async (
  chainId: string,
  blockNumber: string,
) => {
  const { apiURL } = getChainConfig(chainId);
  const apiKey = getExplorerApiKey(chainId);

  const params = {
    module: "proxy",
    action: "eth_getBlockByNumber",
    tag: blockNumber,
    boolean: "false",
    apiKey,
  };

  const res = await axios.get(apiURL, {
    params,
  });

  const json = await res.data;
  const { result } = json;

  if (result && !result.code) {
    return result as Block;
  }

  return null;
};
