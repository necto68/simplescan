import { RawTransaction } from "@/types/RawTransaction";
import { Block } from "@/types/Block";
import { TransactionStatus } from "@/types/TransactionStatus";

export interface TransactionPageProps {
  transaction: RawTransaction | null;
  block: Block | null;
  transactionStatus: TransactionStatus | null;
}
