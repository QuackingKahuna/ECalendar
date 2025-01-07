import { useState, useEffect } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useSQLiteContext } from "expo-sqlite";
import { Calendar as CalendarComponent, DateData } from "react-native-calendars";
import KeyValueStorage from "expo-sqlite/kv-store"
import { RootState } from "@/redux/store";
import { resolveMarkedDatesStyles } from "./Calendar.styles";
import { changeSelectedDay, getDayDataForSelectedMonth } from "./Calendar.functions";
import { EXPECTED_MENSTRUATION_KEY } from "@/consts/keyValueStorage";
import { Tab } from "@/types/db/tab";

export const Calendar = ({ tab }: { tab: Tab }) => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { daysInSelectedMonth, selectedDay } = useSelector((state: RootState) => state.days);
  const { selectedSigns } = useSelector((state: RootState) => state.sign);
  const [selectedMonth, setSelectedMonth] = useState<string>(selectedDay.id.slice(0, 7));
  const [expectedMenstruation, setExpectedMenstruation] = useState<string | null>(null);

  useEffect(() => {
    getDayDataForSelectedMonth({ db, selectedMonth, dispatch });
  }, [selectedMonth]);

  useEffect(() => {
    const getExpectedMenstruation = async () => {
      const value = await KeyValueStorage.getItem(EXPECTED_MENSTRUATION_KEY);
      setExpectedMenstruation(value);
    }
    getExpectedMenstruation();
  }, []);

  return (
    <View>
      <CalendarComponent
        onDayPress={(day: DateData) => changeSelectedDay({
          db,
          selectedDayId: day.dateString,
          dispatch
        })}
        onMonthChange={(month: DateData) => setSelectedMonth(month.dateString.slice(0, 7))}
        markingType={"custom"}
        markedDates={resolveMarkedDatesStyles({
          daysInSelectedMonth,
          expectedMenstruation,
          selectedDay,
          selectedSigns,
          tab
        })}
      />
    </View>
  )
}

export default Calendar;