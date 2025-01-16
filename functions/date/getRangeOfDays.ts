import { DayId } from "@/types/db/day";
import { addDays } from "./addDays";
import { dateToDayId } from "./dateToDayId";
import { diffInDays } from "./diffInDays";

type RangeOfDaysInput = {
  startDate: DayId;
  endDate: DayId;
}

export const getRangeOfDays = ({ startDate, endDate }: RangeOfDaysInput) => {
  const res = [startDate];
  const current = new Date(startDate);
  const end = new Date(endDate);
  const days = diffInDays(current, end);
  for (let i = 1; i <= days; i++) {
    addDays(current, 1);
    res.push(dateToDayId(current));
  }
  return res;
}