import { Cycle } from "@/types/db/cycle";
import { SQLiteDatabase } from "expo-sqlite";

export const getCurrentCycle = async (db: SQLiteDatabase) => {
  return await db.getFirstAsync<Cycle>(`SELECT * FROM cycles ORDER BY id DESC LIMIT 1`);
}