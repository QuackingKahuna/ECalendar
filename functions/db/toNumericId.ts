import { DayId } from "@/types/db/day";

export const toNumericId = (date: DayId | Date) => {
  let year: number;
  let month: number;
  let day: number;
  if (typeof date === "string") {
    const dateParts = date.split("-");
    year = Number(dateParts[0]);
    month = Number(dateParts[1]);
    day = Number(dateParts[2]);
  }
  else {
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
  }
  return day + (month * 100) + (year * 10000);
}