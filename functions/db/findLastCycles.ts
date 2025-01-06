import { Cycle } from "@/types/db/cycle";
import { SQLiteDatabase } from "expo-sqlite";

type FindLastCyclesInput = {
  db: SQLiteDatabase,
  isEven: number,
  numberOfCycles: number,
  offset?: number
}

export const findLastCycles = async ({ db, isEven, numberOfCycles, offset = 0 }: FindLastCyclesInput) => {
  return await db.getAllAsync<Cycle>(`SELECT * FROM cycles WHERE isEven = ? ORDER BY id DESC LIMIT ? OFFSET ?`, [isEven, numberOfCycles, offset]);
}