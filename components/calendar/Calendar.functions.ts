import { SetStateAction } from "react"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { SQLiteDatabase } from "expo-sqlite"
import KeyValueStorage from "expo-sqlite/kv-store"
import { EXPECTED_MENSTRUATION_KEY } from "@/consts/keyValueStorage"
import { addDays } from "@/functions/date/addDays"
import { getDay } from "@/functions/db/getDay"
import { getDays } from "@/functions/db/getDays"
import { toNumericId } from "@/functions/db/toNumericId"
import { setDaysWithData, updateSelectedDay } from "@/redux/daysSlice"
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
    dispatch(updateSelectedDay({
      id: selectedDayId,
      numericId: toNumericId(selectedDayId),
      cycleId: 0
    }));
  }
}

type GetDayDataForSelectedMonthInput = {
  db: SQLiteDatabase,
  selectedMonth: string,
  dispatch: Dispatch<UnknownAction>
}

export const getDayDataForSelectedMonth = async ({ db, selectedMonth, dispatch }: GetDayDataForSelectedMonthInput) => {
  const from = toNumericId(addDays(new Date(`${selectedMonth}`), -6));
  const [year, month] = selectedMonth.split("-");
  const to = toNumericId(addDays(new Date(Number(year), Number(month), 0), 6));
  dispatch(setDaysWithData(await getDays({ db, params: { from, to } })));
}

export const getExpectedMenstruation = async (setExpectedMenstruation: React.Dispatch<SetStateAction<string | null>>) => {
  const value = await KeyValueStorage.getItem(EXPECTED_MENSTRUATION_KEY);
  setExpectedMenstruation(value);
}