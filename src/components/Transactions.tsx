import { intlFormatDistance } from "date-fns";
import Link from "next/link";
import { getTruncatedHash } from "@/helpers/getTruncatedHash";
import { getFormattedBalance } from "@/helpers/getFormattedBalance";
import { ChangeEvent, FC, useMemo, useState } from "react";
import { AddressPageProps } from "@/types/AddressPageProps";
import { useParams } from "next/navigation";
import { AddressPageParams } from "@/types/AddressPageParams";
import { getDateFromUnixTime } from "@/helpers/getDateFromUnixTime";
import { getFormattedTimestamp } from "@/helpers/getFormattedTimestamp";
import { getChainConfig } from "@/helpers/getChainConfig";

interface TransactionsProps extends Pick<AddressPageProps, "transactions"> {}

export const Transactions: FC<TransactionsProps> = ({ transactions }) => {
  const { chainId } = useParams<AddressPageParams>();
  const { symbol } = getChainConfig(chainId);

  const [isShowDatetime, setIsShowDatetime] = useState(false);

  const [sortField, setSortField] = useState<"timeStamp" | "value">(
    "timeStamp",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSortFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value as "timeStamp" | "value");
  };

  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const handleTimestampClick = () => {
    setIsShowDatetime(!isShowDatetime);
  };

  const currentDate = new Date();

  const sortedTransactions = useMemo(
    () =>
      transactions.sort((a, b) => {
        let aValue = Number(a.timeStamp);
        let bValue = Number(b.timeStamp);

        if (sortField === "value") {
          aValue = Number(a.value);
          bValue = Number(b.value);
        }

        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }),
    [sortField, sortOrder, transactions],
  );

  if (!transactions.length) {
    return <p>No transactions found</p>;
  }

  return (
    <div>
      <h3>Transactions</h3>
      <hgroup>
        <p>Sort By</p>
        <select value={sortField} onChange={handleSortFieldChange}>
          <option value="timeStamp">Timestamp</option>
          <option value="value">Amount</option>
        </select>
      </hgroup>
      <hgroup>
        <p>Sort Order</p>
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </hgroup>
      <div className="overflow-auto">
        <table>
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>Block</th>
              <th>
                <a
                  data-tooltip={
                    isShowDatetime
                      ? "Click to show Age Format"
                      : "Click to show Date Time format"
                  }
                  data-placement="bottom"
                  onClick={handleTimestampClick}
                >
                  {isShowDatetime ? "Date Time" : "Age"}
                </a>
              </th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map(
              ({ hash, blockNumber, timeStamp, value }) => {
                const timestampDate = getDateFromUnixTime(timeStamp);

                return (
                  <tr key={hash}>
                    <td>
                      <Link target={"_blank"} href={`/tx/${chainId}/${hash}`}>
                        {getTruncatedHash(hash)}
                      </Link>
                    </td>
                    <td>{blockNumber}</td>
                    <td>
                      {isShowDatetime
                        ? getFormattedTimestamp(timestampDate)
                        : intlFormatDistance(timestampDate, currentDate)}
                    </td>
                    <td>
                      {getFormattedBalance(value)} {symbol}
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
