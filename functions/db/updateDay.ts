import { SQLiteDatabase } from "expo-sqlite";
import getDay from "@/functions/db/getDay";
import { getCurrentCycle } from "@/functions/db/getCurrentCycle";
import { TABLE_DAYS } from "@/consts/db";
import { Day } from "@/types/db/day";

export type UpdateMenstruationStrengthInput = {
  db: SQLiteDatabase,
  dayProp: keyof Day,
  value: number,
  selectedDate: string
}

export const updateDay = async ({ db, dayProp, value, selectedDate }: UpdateMenstruationStrengthInput) => {
  const dayExists = await getDay(db, selectedDate);
  if (dayExists) {
    await db.runAsync(`UPDATE ${TABLE_DAYS} SET ${dayProp} = ? WHERE id = ?`, [value, selectedDate]);
  }
  else {
    const currentCycle = await getCurrentCycle(db);
    await db.runAsync(`INSERT INTO ${TABLE_DAYS} (id, cycleId, ${dayProp}) VALUES (?, ?, ?)`, [selectedDate, currentCycle!.id, value]);
  }
}