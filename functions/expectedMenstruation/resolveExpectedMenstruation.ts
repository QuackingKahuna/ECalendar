import KeyValueStorage from "expo-sqlite/kv-store"
import { EXPECTED_MENSTRUATION_KEY } from "@/consts/keyValueStorage"
import { addDays } from "@/functions/date/addDays"
import { dateToDayId } from "@/functions/date/dateToDayId"
import { Cycle } from "@/types/db/cycle"
import { DayId } from "@/types/db/day"

type ResolveExpectedMenstruationInput = {
  currentCycleStartDate: DayId
  lastCycles: Cycle[]
}

export const resolveExpectedMenstruation = ({ currentCycleStartDate, lastCycles }: ResolveExpectedMenstruationInput) => {
  if (lastCycles.length < 3) return;
  const cycleAverageLength = Math.round((lastCycles.reduce((sum, cycle) => sum + cycle.length!, 0)) / lastCycles.length);
  const expectedMenstruationStart = addDays(new Date(currentCycleStartDate), cycleAverageLength);
  KeyValueStorage.setItem(EXPECTED_MENSTRUATION_KEY, dateToDayId(expectedMenstruationStart));
}