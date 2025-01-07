import { MENSTRUATION_EXPECTED, POTENTIAL, SIGN } from "@/consts/colors";
import getMenstruationStrengthColors from "@/functions/styles/getMenstruationStrengthColors";
import { Day, DayBooleanActionKeys } from "@/types/db/day";
import { Tab } from "@/types/db/tab";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { MarkedDates } from "react-native-calendars/src/types";

type ResolveMarkedDatesStylesInput = {
  daysInSelectedMonth: Day[],
  expectedMenstruation: string | null,
  selectedDay: Day,
  tab: Tab
  selectedSigns: DayBooleanActionKeys[]
}

export const resolveMarkedDatesStyles = ({
  daysInSelectedMonth,
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

      daysInSelectedMonth.forEach(day => {
        if (day.menstruationStrength) {
          const { backgroundColor, textColor } = getMenstruationStrengthColors(day.menstruationStrength)!;
          markedDates[day.id] = markedDateCustomStyle({ backgroundColor, textColor });
        }
        else if (day.potential) {
          markedDates[day.id] = markedDateCustomStyle({ backgroundColor: POTENTIAL });
        }
      });

      markedDates[selectedDay.id] = {
        selected: true,
        marked: !!selectedDay?.menstruationStrength,
        dotColor: getMenstruationStrengthColors(selectedDay?.menstruationStrength)?.backgroundColor
      };
      break;
    case "signs":
      daysInSelectedMonth.forEach(day => {
        selectedSigns.forEach(sign => {
          if (day[sign]) {
            markedDates[day.id] = {
              customStyles: {
                container: {
                  backgroundColor: SIGN
                }
              }
            };
          }
        })
      })
      break;
    default:
      const exhaustiveCheck: never = tab;
  }

  return markedDates;
}

type MarkedDateCustomStyleInput = {
  backgroundColor: string
  textColor?: string
}

const markedDateCustomStyle = ({ backgroundColor, textColor }: MarkedDateCustomStyleInput) => {
  let res: MarkingProps = {
    customStyles: {
      container: {
        backgroundColor
      }
    }
  }
  if (textColor) {
    res.customStyles!.text = { color: textColor }
  }
  return res;
}