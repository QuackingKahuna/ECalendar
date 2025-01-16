import { TABLE_DAYS } from "@/consts/db";
import { Day } from "@/types/db/day";
import { SQLiteDatabase } from "expo-sqlite";

export const getDays = async (db: SQLiteDatabase, days: string[]) => {
  const ids = days.map(d => `'${d}'`).join(",");
  return await db.getAllAsync<Day>(`SELECT * FROM ${TABLE_DAYS} WHERE id IN (${ids})`);
}

export default getDays;