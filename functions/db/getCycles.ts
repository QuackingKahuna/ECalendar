import { Cycle } from "@/types/db/cycle";
import { SQLiteDatabase } from "expo-sqlite";
import { FindLastCyclesParams } from "./findLastCycles";

type GetCyclesInput = {
  db: SQLiteDatabase,
  params?: FindLastCyclesParams
}

export const getCycles = async ({ db, params }: GetCyclesInput) => {
  let condition = "";
  let limit = "";
  let offset = "";
  if (params) {
    condition = `WHERE isEven = ${params.isEven}`;
    limit = `LIMIT ${params.numberOfCycles}`;
    offset = `OFFSET ${params.offset ?? 0}`;
  }
  return await db.getAllAsync<Cycle>(`SELECT * FROM cycles ${condition} ORDER BY id DESC ${limit} ${offset}`);
}