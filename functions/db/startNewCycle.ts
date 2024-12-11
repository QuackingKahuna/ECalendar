import { diffInDays } from "@/functions/calendar/diffInDays";
import { Cycle } from "@/types/db/cycle";
import { SQLiteDatabase } from "expo-sqlite";

export const startNewCycle = async (db: SQLiteDatabase, selectedDate: string) => {
  const lastCycle = await db.getFirstAsync<Cycle>(`SELECT * FROM cycles ORDER BY id DESC LIMIT 1`);
  if (lastCycle) {
    const cycleLength = diffInDays(lastCycle.startDate, selectedDate);
    await db.runAsync(`UPDATE cycles SET endDate = ?, length = ? WHERE id = ?`, [selectedDate, cycleLength, lastCycle.id]);
    await db.runAsync(`INSERT INTO cycles (startDate, isEven) VALUES (?, ?)`, [selectedDate, lastCycle.isEven === 1 ? 0 : 1]);
  }
  else {
    await db.runAsync(`INSERT INTO cycles (startDate) VALUES (?)`, [selectedDate]);
  }
};

export default startNewCycle;