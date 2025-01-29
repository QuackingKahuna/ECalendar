import { TABLE_DAYS } from "@/consts/db";
import { SQLiteDatabase } from "expo-sqlite";
import { toNumericId } from "./toNumericId";
import { DayId } from "@/types/db/day";

type InsertPotentialDaysInput = {
  dayIds: DayId[]
  cycleId: number;
  db: SQLiteDatabase,
}

//TODO: how to achieve bulk insert
export const insertPotentialDays = async ({ db, dayIds, cycleId }: InsertPotentialDaysInput) => {
  dayIds.forEach(async (dId) => {
    const numericId = toNumericId(dId);
    await db.runAsync(`INSERT INTO ${TABLE_DAYS} (id, numericId, cycleId, potential) VALUES (?, ?, ?, 1)`, [dId, numericId, cycleId]);
  });
  // await db.runAsync(`INSERT INTO ${TABLE_DAYS} (id, cycleId, potential) ${valuesString({ dayIds, cycleId })}`);
};

// type valuesStringInput = {
//   dayIds: string[]
//   cycleId: number;
// }

// const valuesString = ({ dayIds, cycleId }: valuesStringInput) => {
//   let values: string[] = [];
//   dayIds.forEach(dId => { values.push(`(${dId}, ${cycleId}, 1)`) })
//   console.log(`VALUES ${values.join(", ")}`);
//   return `VALUES ${values.join(", ")}`
// }