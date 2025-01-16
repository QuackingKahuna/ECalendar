import { markedDateCustomStyle } from "@/styles/calendar";
import { DayId } from "@/types/db/day";
import { PositionInRange } from "@/types/positionInRange";
import { MarkedDates } from "react-native-calendars/src/types";

type ResolveMarkedDatesStylesInput = {
  days: DayId[]
}

export const resolveMarkedDatesStyles = ({ days }: ResolveMarkedDatesStylesInput) => {
  const markedDates: MarkedDates = {};
  days.forEach((day, index) => {
    const positionInRange = resolvePositionInRange({ range: days, index });
    markedDates[day] = markedDateCustomStyle({ backgroundColor: "limegreen", positionInRange });
  })
  return markedDates;
}

type ResolvePositionInPeriodType = {
  range: DayId[],
  index: number,
}

const resolvePositionInRange = ({ range, index }: ResolvePositionInPeriodType) => {
  let res: PositionInRange = "middle";
  if (index === 0) {
    res = "start";
  } else if (index === range.length - 1) {
    res = "end";
  }
  return res;
}