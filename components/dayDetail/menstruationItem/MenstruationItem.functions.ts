import { SQLiteDatabase } from "expo-sqlite";
import { startNewCycle } from "@/functions/db/startNewCycle";
import { updateSelectedDay } from "@/redux/daysSlice";
import { updateDay } from "@/functions/db/updateDay";
import { Day } from "@/types/db/day";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { getCurrentCycle } from "@/functions/db/getCurrentCycle";
import { findLastCycles } from "@/functions/db/findLastCycles";
import { insertPotentialDays } from "@/functions/db/insertPotentialDays";
import { findPotentialDays } from "@/functions/potential/findPotentialDays";
import { resolveExpectedMenstruation } from "@/functions/expectedMenstruation/resolveExpectedMenstruation";

export type OptionPressInput = {
  db: SQLiteDatabase;
  dispatch: Dispatch<UnknownAction>;
  item: string;
  selectedDay: Day;
}

export const onOptionPress = async ({ db, dispatch, item, selectedDay }: OptionPressInput) => {
  if (item === "+") {
    await determinePotentialDaysAndStartNewCycle({ db, selectedDayId: selectedDay.id });
  }
  else {
    let strength = parseInt(item);
    if (selectedDay.menstruationStrength === strength) {
      strength = 0;
    }
    dispatch(updateSelectedDay({ ...selectedDay, menstruationStrength: strength }));
    await updateDay({ db, dayProp: "menstruationStrength", value: strength, selectedDate: selectedDay.id });
  }
}

type DeterminePotentialDaysAndStartNewCycleInput = {
  db: SQLiteDatabase;
  selectedDayId: string;
};

const determinePotentialDaysAndStartNewCycle = async ({ db, selectedDayId }: DeterminePotentialDaysAndStartNewCycleInput) => {
  const currentCycle = await getCurrentCycle(db);
  await startNewCycle({ db, selectedDate: selectedDayId, currentCycle });

  if (currentCycle) {
    const lastCycles = await findLastCycles({
      db,
      isEven: currentCycle!.isEven ? 0 : 1,
      numberOfCycles: 3,
      offset: 1
    });
    const potentialDayIds = await findPotentialDays({
      currentCycleStartDate: currentCycle.startDate,
      lastCycles
    });
    if (potentialDayIds) {
      try {
        await insertPotentialDays({ db, dayIds: potentialDayIds, cycleId: currentCycle.id + 1 })
      }
      catch (e) {
        //TODO: check for issues and optimize
        console.log(e);
      }
    }

    await resolveExpectedMenstruation({
      currentCycleStartDate: currentCycle.startDate,
      lastCycles
    });
  }
}