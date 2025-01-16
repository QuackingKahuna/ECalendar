import { updateDay } from "@/functions/db/updateDay";
import { updateSelectedDay } from "@/redux/daysSlice";
import { Day } from "@/types/db/day";
import { UnknownAction } from "@reduxjs/toolkit";
import { SQLiteDatabase } from "expo-sqlite";
import { Dispatch } from "react";

type onSubmitInput = {
  db: SQLiteDatabase;
  dispatch: Dispatch<UnknownAction>;
  selectedDay: Day;
  temperature: string;
}

export const onSubmit = ({ db, dispatch, selectedDay, temperature }: onSubmitInput) => async () => {
  const temperatureNumber = parseFloat(temperature) ?? undefined;
  dispatch(updateSelectedDay({ ...selectedDay, temperature: temperatureNumber }));
  await updateDay({
    db,
    dayProp: "temperature",
    value: temperatureNumber,
    selectedDate: selectedDay.id
  });
}