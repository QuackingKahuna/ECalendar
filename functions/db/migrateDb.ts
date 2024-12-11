import { SQLiteDatabase } from "expo-sqlite";

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync(
    'PRAGMA user_version'
  ) as { user_version: number };
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    const booleanColumns = ["menstruationStrength", "sex", "ovarypl", "ovarypr", "hipp", "stomachc", "stomacha", "fatigue", "spinningHead", "fertileMocus", "sensitiveBreasts", "staining", "moodiness", "cravings", "diarrhea"];
    await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE cycles (id INTEGER PRIMARY KEY AUTOINCREMENT, startDate TEXT NOT NULL, endDate TEXT, length INTEGER, isEven INTEGER NOT NULL DEFAULT 0);
        CREATE TABLE days (id TEXT PRIMARY KEY NOT NULL, cycleId INTEGER NOT NULL, temperature REAL, ${booleanColumnsDefinition(booleanColumns)}, FOREIGN KEY(cycleId) REFERENCES cycles(id));
      `);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

const booleanColumnsDefinition = (columns: string[]) => {
  return columns.join(' INTEGER NOT NULL DEFAULT 0, ').slice(0, -2);
};

export default migrateDbIfNeeded;