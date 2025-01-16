import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { SQLiteDatabase } from "expo-sqlite"
import { getDay } from "@/functions/db/getDay"
import { setDaysWithData, updateSelectedDay } from "@/redux/daysSlice"
import { getDaysInMonth } from "@/functions/db/getDaysInMonth"
import { DayId } from "@/types/db/day"

type ChangeSelectedDayInput = {
  db: SQLiteDatabase
  selectedDayId: DayId
  dispatch: Dispatch<UnknownAction>
}

export const changeSelectedDay = async ({ db, selectedDayId, dispatch }: ChangeSelectedDayInput) => {
  const dayFromDb = await getDay(db, selectedDayId);
  if (dayFromDb) {
    dispatch(updateSelectedDay(dayFromDb));
  }
  else {
    dispatch(updateSelectedDay({ id: selectedDayId, cycleId: 0 }));
  }
}

type GetDayDataForSelectedMonthInput = {
  db: SQLiteDatabase,
  selectedMonth: string,
  dispatch: Dispatch<UnknownAction>
}

export const getDayDataForSelectedMonth = async ({ db, selectedMonth, dispatch }: GetDayDataForSelectedMonthInput) => {
  dispatch(setDaysWithData(await getDaysInMonth(db, selectedMonth)));
}