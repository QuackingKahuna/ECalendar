import { SQLiteDatabase } from "expo-sqlite";
import getDays from "./getDays";

export const getDay = async (db: SQLiteDatabase, dayId: string) => {
  return (await getDays({ db, params: [dayId] }))[0];
}