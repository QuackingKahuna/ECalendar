import { DayId } from "@/types/db/day";

export const formatDay = (day: DayId) => {
  return day.split("-").reverse().join(".");
}