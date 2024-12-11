import { SQLiteDatabase } from "expo-sqlite";
import { startNewCycle } from "@/functions/db/startNewCycle";
import { updateSelectedDay } from "@/redux/daysSlice";
import { updateMenstruationStrength } from "@/functions/db/updateMenstruationStrength";
import { Day } from "@/types/db/day";

export type OptionPressInput = {
  item: string;
  db: SQLiteDatabase;
  selectedDay: Day;
  dispatch: any;
}

export const onOptionPress = ({ item, db, selectedDay, dispatch }: OptionPressInput) => async () => {
  if (item === "+") {
    await startNewCycle(db, selectedDay.id);
  }
  else {
    let strength = parseInt(item);
    if (selectedDay.menstruationStrength === strength) {
      strength = 0;
    }
    dispatch(updateSelectedDay({ ...selectedDay, menstruationStrength: strength }));
    await updateMenstruationStrength({ db, strength, selectedDate: selectedDay.id });
  }
}