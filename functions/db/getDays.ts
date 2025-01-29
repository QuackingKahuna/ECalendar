import { TABLE_DAYS } from "@/consts/db";
import { Day, DayId } from "@/types/db/day";
import { SQLiteDatabase } from "expo-sqlite";
import { toNumericId } from "./toNumericId";

type GetDaysInput = {
  db: SQLiteDatabase,
  params: string[] | { from: number | DayId, to: number | DayId }
}

export const getDays = async ({ db, params }: GetDaysInput) => {
  let condition = "";
  if (Array.isArray(params)) {
    const ids = params.map(d => `'${d}'`).join(",");
    condition = `WHERE id IN (${ids})`;
  }
  else {
    const from = typeof params.from === "string" ? toNumericId(params.from) : params.from;
    const to = typeof params.to === "string" ? toNumericId(params.to) : params.to;
    condition = `WHERE numericId BETWEEN ${from} AND ${to}`
  }
  return await db.getAllAsync<Day>(`SELECT * FROM ${TABLE_DAYS} ${condition} ORDER BY numericId ASC`);
}

export default getDays;