import { useEffect } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useSQLiteContext } from "expo-sqlite";
import Calendar from "@/components/calendar/Calendar";
import { DayDetail } from "@/components/dayDetail/DayDetail";
import { RootState } from "@/redux/store";
import { globalStyles } from "@/styles/container";
import { initializeReduxState } from "./CalendarWithDayDetailPage.functions";
import { Tab } from "@/types/db/tab";

export const CalendarWithDayDetailPage = ({ tab }: { tab: Tab }) => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { selectedDay } = useSelector((state: RootState) => state.days);

  useEffect(() => {
    if (selectedDay.cycleId === -1) {
      initializeReduxState({ db, selectedDayId: selectedDay.id, dispatch });
    }
  }, [])

  return (
    <View style={globalStyles.container}>
      <Calendar tab={tab} />
      <DayDetail tab={tab} />
    </View>
  )
}

export default CalendarWithDayDetailPage;
