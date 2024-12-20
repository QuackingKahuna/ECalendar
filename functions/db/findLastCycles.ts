import { Cycle } from "@/types/db/cycle";
import { SQLiteDatabase } from "expo-sqlite";

type FindLastCyclesInput = {
  db: SQLiteDatabase,
  isEven: number,
  numberOfCycles: number
}

export const findLastCycles = async ({ db, isEven, numberOfCycles }: FindLastCyclesInput) => {
  return await db.getAllAsync<Cycle>(`SELECT * FROM cycles WHERE isEven = ? ORDER BY id DESC LIMIT ?`, [isEven, numberOfCycles]);
}