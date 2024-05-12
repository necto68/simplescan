export const getFormattedBalance = (balance: string, isShowFull?: boolean) => {
  const balanceFloat = parseFloat(balance) / 10 ** 18;

  if (isShowFull) return balanceFloat.toString();

  if (balanceFloat === 0) return "0";

  if (balanceFloat < 0.0001) return "<0.0001";

  return balanceFloat.toFixed(4);
};
