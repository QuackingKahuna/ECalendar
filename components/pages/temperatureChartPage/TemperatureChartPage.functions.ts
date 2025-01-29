import { Dispatch, SetStateAction } from "react";
import { SQLiteDatabase } from "expo-sqlite";
import { TemperatureChartData } from '@/components/temperatureChart/TemperatureChart.types';
import { today } from "@/functions/date/today";
import { getCycles } from "@/functions/db/getCycles";
import { getDays } from "@/functions/db/getDays";
import { Cycle } from "@/types/db/cycle";

type GetAllCyclesInput = {
  db: SQLiteDatabase;
  setCycles: Dispatch<SetStateAction<Cycle[]>>;
  setCycle: Dispatch<SetStateAction<Cycle | null>>;
}

export const getAllCycles = async ({ db, setCycles, setCycle }: GetAllCyclesInput) => {
  const cyclesFromDb = await getCycles({ db });
  setCycles(cyclesFromDb);
  setCycle(cyclesFromDb[0]);
}

type UpdateTemperatureDataInput = {
  db: SQLiteDatabase;
  cycle: Cycle;
  setTemperatureData: Dispatch<SetStateAction<TemperatureChartData[]>>;
}

export const updateTemperatureData = async ({ db, cycle, setTemperatureData }: UpdateTemperatureDataInput) => {
  const daysData = await getDays({
    db,
    params: { from: cycle.startDate, to: cycle.endDate ?? today() }
  });
  setTemperatureData(daysData.map(day => ({ day: day.id, temperature: day.temperature })));
}