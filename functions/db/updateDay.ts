import { SQLiteDatabase } from "expo-sqlite";
import { getDay } from "@/functions/db/getDay";
import { getCurrentCycle } from "@/functions/db/getCurrentCycle";
import { TABLE_DAYS } from "@/consts/db";
import { Day, DayId } from "@/types/db/day";

export type UpdateDayInput<T extends keyof Day> = {
  db: SQLiteDatabase,
  dayProp: T,
  value: Day[T],
  selectedDate: DayId
}

export const updateDay = async ({ db, dayProp, value, selectedDate }: UpdateDayInput<keyof Day>) => {
  const dayExists = await getDay(db, selectedDate);

  if (dayExists) {
    await db.runAsync(`UPDATE ${TABLE_DAYS} SET ${dayProp} = ? WHERE id = ?`, [value ?? null, selectedDate]);
  }
  else {
    const currentCycle = await getCurrentCycle(db);
    await db.runAsync(`INSERT INTO ${TABLE_DAYS} (id, cycleId, ${dayProp}) VALUES (?, ?, ?)`, [selectedDate, currentCycle!.id, value ?? null]);
  }
}