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
import { DayDetailTab } from "@/types/dayDetailTab";
import { changeVisibleMonth } from "@/redux/daysSlice";
import { DayId } from "@/types/db/day";

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
      const getExpectedMenstruation = async () => {
        const value = await KeyValueStorage.getItem(EXPECTED_MENSTRUATION_KEY);
        setExpectedMenstruation(value);
      }
      getExpectedMenstruation();
    }
  }, []);

  return (
    <View>
      <CalendarComponent
        onDayPress={(day: DateData) => changeSelectedDay({
          db,
          selectedDayId: day.dateString as DayId,
          dispatch
        })}
        onMonthChange={(month: DateData) => {
          dispatch(changeVisibleMonth(`${month.year}-${month.month}`));
        }}
        markingType={"custom"}
        markedDates={resolveMarkedDatesStyles({
          expectedMenstruation,
          daysWithData: daysWithData,
          selectedDay,
          selectedSigns,
          tab
        })}
        firstDay={1}
        enableSwipeMonths
        initialDate={`${visibleMonth}-01`}
      />
    </View>
  )
}

export default Calendar;