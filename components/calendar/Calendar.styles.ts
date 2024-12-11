import getMenstruationStrengthColors from "@/functions/styles/getMenstruationStrengthColors";
import { Day } from "@/types/db/day";

type ResolveMarkedDatesStylesInput = {
  daysInSelectedMonth: Day[],
  selectedDay: Day
}

export const resolveMarkedDatesStyles = ({ daysInSelectedMonth, selectedDay }: ResolveMarkedDatesStylesInput) => {
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
  });

  markedDates[selectedDay.id] = {
    selected: true,
    marked: !!selectedDay?.menstruationStrength,
    dotColor: getMenstruationStrengthColors(selectedDay?.menstruationStrength)?.backgroundColor
  };

  return markedDates;
}