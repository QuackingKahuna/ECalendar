import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSQLiteContext } from "expo-sqlite";
import { Calendar as CalendarComponent, DateData } from "react-native-calendars";
import { getYearMonthFromDayId } from "@/functions/date/getYearMonthFromDayId";
import { changeVisibleMonth } from "@/redux/daysSlice";
import { RootState } from "@/redux/store";
import { DayDetailTab } from "@/types/dayDetailTab";
import { DayId } from "@/types/db/day";
import { changeSelectedDay, getDayDataForSelectedMonth, getExpectedMenstruation } from "./Calendar.functions";
import { resolveMarkedDatesStyles } from "./Calendar.styles";

export const Calendar = ({ tab }: { tab: DayDetailTab }) => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { daysWithData, selectedDay, visibleMonth } = useSelector((state: RootState) => state.days);
  const { selectedSigns } = useSelector((state: RootState) => state.sign);
  const [expectedMenstruation, setExpectedMenstruation] = useState<string | null>(null);

  useEffect(() => {
    getDayDataForSelectedMonth({ db, selectedMonth: visibleMonth, dispatch });
  }, [visibleMonth]);

  useEffect(() => {
    if (tab === "menstruation") {
      getExpectedMenstruation(setExpectedMenstruation);
    }
  }, []);

  return (
    <CalendarComponent
      onDayPress={(day: DateData) => changeSelectedDay({
        db,
        selectedDayId: day.dateString as DayId,
        dispatch
      })}
      onMonthChange={(month: DateData) => {
        dispatch(changeVisibleMonth(getYearMonthFromDayId(month.dateString as DayId)));
      }}
      markingType={"custom"}
      markedDates={resolveMarkedDatesStyles({
        expectedMenstruation,
        daysWithData,
        selectedDay,
        selectedSigns,
        tab
      })}
      firstDay={1}
      enableSwipeMonths
      initialDate={`${visibleMonth}-01`}
    />
  )
}

export default Calendar;