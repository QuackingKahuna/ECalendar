import { Day } from "@/types/db/day";
import { SQLiteDatabase } from "expo-sqlite";

export const getDay = async (db: SQLiteDatabase, selectedDate: string) => {
  return await db.getFirstAsync<Day>(`SELECT * FROM days WHERE id = ?`, [selectedDate]);
}

export default getDay;