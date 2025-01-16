import { DayId } from "@/types/db/day";

export const diffInDays = (date1: Date | DayId, date2: Date | DayId) => {
  if (typeof date1 === "string") date1 = new Date(date1);
  if (typeof date2 === "string") date2 = new Date(date2);
  const diffTime = Math.abs(date1.getTime() - date2.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}