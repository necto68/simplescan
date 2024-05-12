import { fromUnixTime } from "date-fns";

export const getDateFromUnixTime = (timestamp: string) =>
  fromUnixTime(parseInt(timestamp));
