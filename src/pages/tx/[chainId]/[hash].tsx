import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { TransactionPageProps } from "@/types/TransactionPageProps";
import { TransactionPageParams } from "@/types/TransactionPageParams";
import { getRawTransactionByHash } from "@/lib/getRawTransactionByHash";
import { TransactionPage } from "@/components/TransactionPage";
import { getBlockByBlockNumber } from "@/lib/getBlockByBlockNumber";
import { getTransactionStatusByHash } from "@/lib/getTransactionStatusByHash";

export const getServerSideProps: GetServerSideProps<
  TransactionPageProps,
  TransactionPageParams
> = async ({ params }) => {
  const chainId = params?.chainId ?? "";
  const hash = params?.hash ?? "";

  const [transaction, transactionStatus] = await Promise.all([
    getRawTransactionByHash(chainId, hash),
    getTransactionStatusByHash(chainId, hash),
  ]);

  // transaction data doesn't include timestamp,
  // so we need to fetch block data to get the timestamp
  const block = transaction
    ? await getBlockByBlockNumber(chainId, transaction.blockNumber)
    : null;

  return { props: { transaction, block, transactionStatus } };
};

export default function Page({
  transaction,
  block,
  transactionStatus,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <TransactionPage
      transaction={transaction}
      block={block}
      transactionStatus={transactionStatus}
    />
  );
}
