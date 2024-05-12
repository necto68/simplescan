import { FC } from "react";
import { NavBar } from "@/components/NavBar";
import { getFormattedBalance } from "@/helpers/getFormattedBalance";
import { useParams } from "next/navigation";
import { TransactionPageProps } from "@/types/TransactionPageProps";
import { TransactionPageParams } from "@/types/TransactionPageParams";
import { getFormattedTimestamp } from "@/helpers/getFormattedTimestamp";
import { getDateFromUnixTime } from "@/helpers/getDateFromUnixTime";
import { getChainConfig } from "@/helpers/getChainConfig";
import Link from "next/link";

export const TransactionPage: FC<TransactionPageProps> = ({
  transaction,
  block,
  transactionStatus,
}) => {
  const { chainId } = useParams<TransactionPageParams>();

  if (!transaction || !block || !transactionStatus) {
    return (
      <>
        <NavBar />
        <main className="container">
          <p>No Transaction found</p>
        </main>
      </>
    );
  }

  const { title, symbol, explorerURL } = getChainConfig(chainId);

  const { hash, blockNumber, value, gas, gasPrice } = transaction;
  const { timestamp } = block;
  const { status } = transactionStatus;

  const transactionFee = parseInt(gas) * parseInt(gasPrice);

  const formattedBlockNumber = parseInt(blockNumber);
  const formattedTimestamp = getFormattedTimestamp(
    getDateFromUnixTime(timestamp),
  );
  const formattedAmount = getFormattedBalance(parseInt(value).toString(), true);
  const formattedTransactionFee = getFormattedBalance(
    transactionFee.toString(),
    true,
  );

  return (
    <>
      <NavBar />
      <main className="container">
        <h1>{hash}</h1>
        <p>
          <b>Transaction Hash:</b> {hash}
        </p>
        <p>
          <b>Chain Id:</b> {chainId} ({title})
        </p>
        <p>
          <b>Status:</b> {status === "1" ? "Success" : "Failed"}
        </p>
        <p>
          <b>Block Number:</b> {formattedBlockNumber}
        </p>
        <p>
          <b>Timestamp:</b> {formattedTimestamp}
        </p>
        <p>
          <b>Amount:</b> {formattedAmount} {symbol}
        </p>
        <p>
          <b>Transaction Fee:</b> {formattedTransactionFee} {symbol}
        </p>
        <p>
          <b>Explorer:</b>{" "}
          <Link href={`${explorerURL}/tx/${hash}`} target="_blank">
            Link
          </Link>
        </p>
      </main>
    </>
  );
};
