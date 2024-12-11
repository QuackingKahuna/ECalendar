import { useEffect } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useSQLiteContext } from "expo-sqlite";
import Calendar from "@/components/calendar/Calendar";
import MenstruationItem from "@/components/controls/menstruation/MenstruationItem";
import { RootState } from "@/redux/store";
import { initializeSelectedDayData } from "./MainPage.functions";

export const MainPage = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { selectedDay } = useSelector((state: RootState) => state.days);

  useEffect(() => {
    if (selectedDay.cycleId === -1) {
      initializeSelectedDayData({ db, selectedDayId: selectedDay.id, dispatch });
    }
  }, [])

  return (
    <View>
      <Calendar />
      <MenstruationItem />
    </View>
  )
}

export default MainPage;

