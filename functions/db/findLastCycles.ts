import { SQLiteDatabase } from "expo-sqlite";
import { getCycles } from "./getCycles";

type FindLastCyclesInput = FindLastCyclesParams & {
  db: SQLiteDatabase,
}

export type FindLastCyclesParams = {
  isEven: number,
  numberOfCycles: number,
  offset?: number
}

export const findLastCycles = async ({ db, isEven, numberOfCycles, offset }: FindLastCyclesInput) => {
  return getCycles({ db, params: { isEven, numberOfCycles, offset } });
}