import { TABLE_CYCLES } from "@/consts/db";
import { diffInDaysString } from "@/functions/calendar/diffInDays";
import { Cycle } from "@/types/db/cycle";
import { SQLiteDatabase } from "expo-sqlite";

type StartNewCycleInput = {
  db: SQLiteDatabase;
  selectedDate: string;
  currentCycle: Cycle | null;
}

export const startNewCycle = async ({ db, selectedDate, currentCycle }: StartNewCycleInput) => {
  if (currentCycle) {
    const cycleLength = diffInDaysString(currentCycle.startDate, selectedDate);
    await db.runAsync(`UPDATE ${TABLE_CYCLES} SET endDate = ?, length = ? WHERE id = ?`, [selectedDate, cycleLength, currentCycle.id]);
    await db.runAsync(`INSERT INTO ${TABLE_CYCLES} (startDate, isEven) VALUES (?, ?)`, [selectedDate, currentCycle.isEven ? 0 : 1]);
  }
  else {
    await db.runAsync(`INSERT INTO ${TABLE_CYCLES} (startDate) VALUES (?)`, [selectedDate]);
  }
};