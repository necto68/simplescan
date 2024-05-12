import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getBalanceByAddress } from "@/lib/getBalanceByAddress";
import { getTransactionsByAddress } from "@/lib/getTransactionsByAddress";
import { AddressPageProps } from "@/types/AddressPageProps";
import { AddressPageParams } from "@/types/AddressPageParams";
import { AddressPage } from "@/components/AddressPage";

export const getServerSideProps: GetServerSideProps<
  AddressPageProps,
  AddressPageParams
> = async ({ params }) => {
  const chainId = params?.chainId ?? "";
  const address = params?.address ?? "";

  const [balance, transactions] = await Promise.all([
    getBalanceByAddress(chainId, address),
    getTransactionsByAddress(chainId, address),
  ]);

  return { props: { balance, transactions } };
};

export default function Page({
  balance,
  transactions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <AddressPage balance={balance} transactions={transactions} />;
}
