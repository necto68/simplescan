import { format } from "date-fns";

export const getFormattedTimestamp = (timestampDate: Date) =>
  format(timestampDate, "yyyy-MM-dd HH:mm:ss");
