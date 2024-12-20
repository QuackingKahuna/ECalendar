import { MENSTRUATION_EXPECTED, POTENTIAL } from "@/consts/colors";
import getMenstruationStrengthColors from "@/functions/styles/getMenstruationStrengthColors";
import { Day } from "@/types/db/day";

type ResolveMarkedDatesStylesInput = {
  daysInSelectedMonth: Day[],
  expectedMenstruation: string | null,
  selectedDay: Day,
}

export const resolveMarkedDatesStyles = ({ daysInSelectedMonth, expectedMenstruation, selectedDay }: ResolveMarkedDatesStylesInput) => {
  const markedDates: any = {};

  daysInSelectedMonth.forEach(day => {
    if (day.menstruationStrength) {
      const msc = getMenstruationStrengthColors(day.menstruationStrength)!;
      markedDates[day.id] = {
        customStyles: {
          container: {
            backgroundColor: msc.backgroundColor
          },
          text: {
            color: msc.textColor
          }
        }
      };
    }
    else if (day.potential) {
      markedDates[day.id] = {
        customStyles: {
          container: {
            backgroundColor: POTENTIAL
          }
        }
      };
    }
  });

  markedDates[selectedDay.id] = {
    selected: true,
    marked: !!selectedDay?.menstruationStrength,
    dotColor: getMenstruationStrengthColors(selectedDay?.menstruationStrength)?.backgroundColor
  };

  if (expectedMenstruation) {
    markedDates[expectedMenstruation] = {
      customStyles: {
        container: {
          backgroundColor: MENSTRUATION_EXPECTED
        }
      }
    };
  }

  return markedDates;
}