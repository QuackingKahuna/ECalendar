import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { SQLiteDatabase } from "expo-sqlite";
import { getDay } from "@/functions/db/getDay";
import { updateSelectedDay } from "@/redux/daysSlice";

export type InitializeSelectedDayDataInput = {
  db: SQLiteDatabase,
  selectedDayId: string,
  dispatch: Dispatch<UnknownAction>
}

export const initializeSelectedDayData = async ({ db, selectedDayId, dispatch }: InitializeSelectedDayDataInput) => {
  const day = await getDay(db, selectedDayId);
  if (day) {
    dispatch(updateSelectedDay(day));
  }
}