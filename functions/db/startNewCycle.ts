import { TABLE_CYCLES } from "@/consts/db";
import { diffInDays } from "@/functions/date/diffInDays";
import { Cycle } from "@/types/db/cycle";
import { DayId } from "@/types/db/day";
import { SQLiteDatabase } from "expo-sqlite";

type StartNewCycleInput = {
  db: SQLiteDatabase;
  selectedDate: DayId;
  currentCycle: Cycle | null;
}

export const startNewCycle = async ({ db, selectedDate, currentCycle }: StartNewCycleInput) => {
  if (currentCycle) {
    const cycleLength = diffInDays(currentCycle.startDate, selectedDate);
    await db.runAsync(`UPDATE ${TABLE_CYCLES} SET endDate = ?, length = ? WHERE id = ?`, [selectedDate, cycleLength, currentCycle.id]);
    await db.runAsync(`INSERT INTO ${TABLE_CYCLES} (startDate, isEven) VALUES (?, ?)`, [selectedDate, currentCycle.isEven ? 0 : 1]);
  }
  else {
    await db.runAsync(`INSERT INTO ${TABLE_CYCLES} (startDate) VALUES (?)`, [selectedDate]);
  }
};