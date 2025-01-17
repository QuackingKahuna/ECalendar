import { TABLE_CYCLES, TABLE_DAYS } from "@/consts/db";
import { dayBooleanInfo1, sexp } from "@/types/db/day";
import { SQLiteDatabase } from "expo-sqlite";

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 3;
  let { user_version: currentDbVersion } = await db.getFirstAsync(
    'PRAGMA user_version'
  ) as { user_version: number };
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE ${TABLE_CYCLES} (id INTEGER PRIMARY KEY AUTOINCREMENT, startDate TEXT NOT NULL, endDate TEXT, length INTEGER, isEven INTEGER NOT NULL DEFAULT 0);
      CREATE TABLE ${TABLE_DAYS} (id TEXT PRIMARY KEY NOT NULL, cycleId INTEGER NOT NULL, temperature REAL, menstruationStrength INTEGER NOT NULL DEFAULT 0, ${booleanColumnsDefinition(dayBooleanInfo1 as unknown as string[])}, FOREIGN KEY(cycleId) REFERENCES cycles(id));
    `);
    currentDbVersion = 1;
  }
  if (currentDbVersion === 1) {
    await db.execAsync(`ALTER TABLE ${TABLE_DAYS} ADD COLUMN ${booleanColumnsDefinition(["potential"])}`);
    currentDbVersion = 2;
  }
  if (currentDbVersion === 2) {
    await db.execAsync(`ALTER TABLE ${TABLE_DAYS} ADD COLUMN ${booleanColumnsDefinition([sexp])}`);
    currentDbVersion = 3;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

const booleanColumnsDefinition = (columns: string[]) => {
  const columnDefinition = ' INTEGER NOT NULL DEFAULT 0';
  return `${columns.join(columnDefinition + ", ")}${columnDefinition}`;
};

export default migrateDbIfNeeded;