export const getExplorerApiKey = (chainId: string) => {
  switch (chainId) {
    case "1":
      return process.env.ETHERSCAN_API_KEY as string;
    case "137":
      return process.env.POLYGONSCAN_API_KEY as string;
    default:
      return "";
  }
};
