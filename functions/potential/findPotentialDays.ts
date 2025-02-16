import { Cycle } from "@/types/db/cycle";
import { dateToDayId } from "../date/dateToDayId";
import { diffInDays } from "../date/diffInDays";
import { addDays } from "../date/addDays";

type FindPotentialDaysInput = {
  currentCycleStartDate: string;
  lastCycles: Cycle[]
}

export const findPotentialDays = async ({ currentCycleStartDate, lastCycles }: FindPotentialDaysInput) => {
  if (lastCycles.length < 3) return;
  const shortestCycleLength = Math.min(...lastCycles.map(cycle => cycle.length!));
  const potentialStart = potentialStarts({ cycleStartDate: currentCycleStartDate, shortestCycleLength });
  const potentialEnd = potentialEnds({ cycleStartDate: currentCycleStartDate, shortestCycleLength });
  const potentialDayIds = [dateToDayId(potentialStart)];
  const potentialLength = diffInDays(potentialStart, potentialEnd);
  for (let i = 1; i < potentialLength; i++) {
    var anotherPotentialDay = addDays(new Date(potentialStart), i);
    potentialDayIds.push(dateToDayId(anotherPotentialDay));
  }
  potentialDayIds.push(dateToDayId(potentialEnd));
  return potentialDayIds;
}

type PotentialCountingInput = {
  cycleStartDate: string;
  shortestCycleLength: number;
}

const potentialStarts = ({ cycleStartDate, shortestCycleLength }: PotentialCountingInput) => {
  const firstMethod = addDays(new Date(cycleStartDate), 8);
  const secondMethod = addDays(new Date(cycleStartDate), shortestCycleLength - 19);
  return new Date(Math.max(...[firstMethod, secondMethod].map(d => d.getTime())));
}

const potentialEnds = ({ cycleStartDate, shortestCycleLength }: PotentialCountingInput) => {
  const firstMethod = addDays(new Date(cycleStartDate), 19);
  const secondMethod = addDays(new Date(cycleStartDate), shortestCycleLength - 10);
  return new Date(Math.min(...[firstMethod, secondMethod].map(d => d.getTime())));
}