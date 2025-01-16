import { DayId } from "@/types/db/day";

export const dateToDayId = (d: Date): DayId => {
  const month = monthDayFormat(d.getMonth() + 1);
  const day = monthDayFormat(d.getDate());
  return `${d.getFullYear()}-${month}-${day}` as DayId;
}

const monthDayFormat = (n: number) => {
  return n < 10 ? `0${n}` : n
}