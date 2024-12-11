import { SQLiteDatabase } from "expo-sqlite";
import getDay from "@/functions/db/getDay";
import { getCurrentCycle } from "@/functions/db/getCurrentCycle";

export type UpdateMenstruationStrengthInput = {
  db: SQLiteDatabase,
  strength: number,
  selectedDate: string
}

export const updateMenstruationStrength = async ({ db, strength, selectedDate }: UpdateMenstruationStrengthInput) => {
  const dayExists = await getDay(db, selectedDate);
  if (dayExists) {
    await db.runAsync(`UPDATE days SET menstruationStrength = ? WHERE id = ?`, [strength, selectedDate]);
  }
  else {
    const currentCycle = await getCurrentCycle(db);
    await db.runAsync(`INSERT INTO days (id, cycleId, menstruationStrength) VALUES (?, ?, ?)`, [selectedDate, currentCycle!.id, strength]);
  }
}