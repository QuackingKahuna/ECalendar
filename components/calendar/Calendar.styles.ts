import { MENSTRUATION_EXPECTED, POTENTIAL, SIGN } from "@/consts/colors";
import { diffInDays } from "@/functions/date/diffInDays";
import getMenstruationStrengthColors from "@/functions/styles/getMenstruationStrengthColors";
import { markedDateCustomStyle } from "@/styles/calendar";
import { Day, DayBooleanActionKeys } from "@/types/db/day";
import { DayDetailTab } from "@/types/dayDetailTab";
import { PositionInRange } from "@/types/positionInRange";
import { MarkedDates } from "react-native-calendars/src/types";
import { getDayFromDayId } from "@/functions/date/getDayFromDayId";
import { getYearMonthFromDayId } from "@/functions/date/getYearMonthFromDayId";

type ResolveMarkedDatesStylesInput = {
  daysWithData: Day[],
  expectedMenstruation: string | null,
  selectedDay: Day,
  tab: DayDetailTab
  selectedSigns: DayBooleanActionKeys[]
}

export const resolveMarkedDatesStyles = ({
  daysWithData,
  expectedMenstruation,
  selectedDay,
  tab,
  selectedSigns
}: ResolveMarkedDatesStylesInput) => {
  const markedDates: MarkedDates = {};
  switch (tab) {
    case "menstruation":
      if (expectedMenstruation) {
        markedDates[expectedMenstruation] = markedDateCustomStyle({
          backgroundColor: MENSTRUATION_EXPECTED
        });
      }

      daysWithData.forEach((day, index) => {
        if (day.menstruationStrength) {
          const { backgroundColor, textColor } = getMenstruationStrengthColors(day.menstruationStrength)!;
          const positionInRange = resolvePositionInRange({ range: daysWithData, index, prop: "menstruationStrength" });
          markedDates[day.id] = markedDateCustomStyle({ backgroundColor, textColor, positionInRange });
        }
        else if (day.potential) {
          const positionInRange = resolvePositionInRange({ range: daysWithData, index, prop: "potential" });
          markedDates[day.id] = markedDateCustomStyle({ backgroundColor: POTENTIAL, positionInRange });
        }
      });

      markedDates[selectedDay.id] = {
        selected: true,
        marked: !!selectedDay?.menstruationStrength,
        dotColor: getMenstruationStrengthColors(selectedDay?.menstruationStrength)?.backgroundColor
      };
      break;
    case "signs":
      daysWithData.forEach(day => {
        selectedSigns.forEach(sign => {
          if (day[sign]) {
            markedDates[day.id] = markedDateCustomStyle({ backgroundColor: SIGN });
          }
        })
      })
      break;
    default:
      const exhaustiveCheck: never = tab;
  }

  return markedDates;
}

type ResolvePositionInPeriodType = {
  range: Day[],
  index: number,
  prop: keyof Day
}

const resolvePositionInRange = ({ range, index, prop }: ResolvePositionInPeriodType) => {
  const previous = index !== 0 ? range[index - 1] : undefined;
  const current = range[index];
  const next = index !== range.length - 1 ? range[index + 1] : undefined;
  // TODO: Provide longer than month range. So far there is a check on first/last day of a month to not show potentially falsy start/end
  const [year, month] = getYearMonthFromDayId(current.id).split("-");
  const lastDayInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();

  // Conditions check for existance of relevant information in previous/next day
  let res: PositionInRange = "middle";
  if (getDayFromDayId(current.id) !== "01"
    && (!previous
      || !previous[prop]
      || diffInDays(previous.id, current.id) > 1)) {
    res = "start";
  } else if (getDayFromDayId(current.id) !== `${lastDayInMonth}`
    && (!next
      || !next[prop]
      || diffInDays(next.id, current.id) > 1)) {
    res = "end";
  }
  return res;
}