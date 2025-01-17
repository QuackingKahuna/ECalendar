import { DayId } from "@/types/db/day";

export const getYearMonthFromDayId = (dayId: DayId) => {
  const month = dayId.slice(0, 7);
  return month
}