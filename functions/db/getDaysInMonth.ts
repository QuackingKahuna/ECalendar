import { Day } from "@/types/db/day";
import { SQLiteDatabase } from "expo-sqlite";

export const getDaysInMonth = async (db: SQLiteDatabase, month: string) => {
  return await db.getAllAsync<Day>(`SELECT * FROM days WHERE id LIKE ?`, [`${month}-__`]);
}

export default getDaysInMonth;