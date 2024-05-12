import { FC } from "react";
import { AddressPageProps } from "@/types/AddressPageProps";
import { NavBar } from "@/components/NavBar";
import { AddressPageParams } from "@/types/AddressPageParams";
import { getFormattedBalance } from "@/helpers/getFormattedBalance";
import { useParams } from "next/navigation";
import { Transactions } from "@/components/Transactions";
import { getChainConfig } from "@/helpers/getChainConfig";

export const AddressPage: FC<AddressPageProps> = ({
  balance,
  transactions,
}) => {
  const { chainId, address } = useParams<AddressPageParams>();
  const { title, symbol } = getChainConfig(chainId);

  return (
    <>
      <NavBar />
      <main className="container">
        <h1>{address}</h1>
        <p>
          <b>Address:</b> {address}
        </p>
        <p>
          <b>Chain Id:</b> {chainId} ({title})
        </p>
        <p>
          <b>Balance:</b> {getFormattedBalance(balance)} {symbol}
        </p>
        <Transactions transactions={transactions} />
      </main>
    </>
  );
};
