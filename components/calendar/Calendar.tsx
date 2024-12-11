import { useState, useEffect } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useSQLiteContext } from "expo-sqlite";
import { Calendar as CalendarComponent, DateData } from "react-native-calendars";
import { RootState } from "@/redux/store";
import { resolveMarkedDatesStyles } from "./Calendar.styles";
import { changeSelectedDay, getDayDataForSelectedMonth } from "./Calendar.functions";

export const Calendar = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { daysInSelectedMonth, selectedDay } = useSelector((state: RootState) => state.days);
  const [selectedMonth, setSelectedMonth] = useState<string>(selectedDay.id.slice(0, 7));

  useEffect(() => {
    getDayDataForSelectedMonth({ db, selectedMonth, dispatch });
  }, [selectedMonth]);

  return (
    <View>
      <CalendarComponent
        onDayPress={(day: DateData) => changeSelectedDay({ db, selectedDayId: day.dateString, dispatch })}
        onMonthChange={(month: DateData) => setSelectedMonth(month.dateString.slice(0, 7))}
        markingType={"custom"}
        markedDates={resolveMarkedDatesStyles({ daysInSelectedMonth, selectedDay })}
      />
    </View>
  )
}

export default Calendar;