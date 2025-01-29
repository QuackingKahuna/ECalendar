import { SQLiteDatabase } from "expo-sqlite";
import { startNewCycle } from "@/functions/db/startNewCycle";
import { updateSelectedDay } from "@/redux/daysSlice";
import { updateDay } from "@/functions/db/updateDay";
import { Day, DayId } from "@/types/db/day";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { getCurrentCycle } from "@/functions/db/getCurrentCycle";
import { findLastCycles } from "@/functions/db/findLastCycles";
import { insertPotentialDays } from "@/functions/db/insertPotentialDays";
import { findPotentialDays } from "@/functions/potential/findPotentialDays";
import { resolveExpectedMenstruation } from "@/functions/expectedMenstruation/resolveExpectedMenstruation";
import { diffInDays } from "@/functions/date/diffInDays";
import { Alert } from "react-native";

export type OptionPressInput = UpdateMenstruationStrengthInput & {
  daysWithData: Day[];
}

export const onOptionPress = async ({
  db,
  daysWithData,
  dispatch,
  item,
  selectedDay
}: OptionPressInput) => {
  const menstruationDays = daysWithData.filter(day => day.menstruationStrength !== 0);
  const lastMenstruationDay = menstruationDays[menstruationDays.length - 1];
  if (!lastMenstruationDay || diffInDays(lastMenstruationDay.id, selectedDay.id) > 7) {
    Alert.alert(
      'Nový cyklus',
      'Přeješ si začít nový cyklus?',
      [{
        text: 'Ne',
        style: 'cancel',
        onPress: async () => {
          await updateMenstruationStrength({ item, selectedDay, db, dispatch });
        },
      }, {
        text: 'Ano',
        onPress: async () => {
          await determinePotentialDaysAndStartNewCycle({ db, selectedDayId: selectedDay.id })
          await updateMenstruationStrength({ item, selectedDay, db, dispatch });
        }
      }]);
  }
  else {
    await updateMenstruationStrength({ item, selectedDay, db, dispatch });
  }
}

type DeterminePotentialDaysAndStartNewCycleInput = {
  db: SQLiteDatabase;
  selectedDayId: DayId;
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

type UpdateMenstruationStrengthInput = {
  db: SQLiteDatabase;
  dispatch: Dispatch<UnknownAction>;
  item: 1 | 2 | 3;
  selectedDay: Day;
}

const updateMenstruationStrength = async ({ item, selectedDay, db, dispatch }: UpdateMenstruationStrengthInput) => {
  let strength: 0 | 1 | 2 | 3 = item;
  if (selectedDay.menstruationStrength === strength) {
    strength = 0;
  }
  dispatch(updateSelectedDay({ ...selectedDay, menstruationStrength: strength }));
  await updateDay({
    db,
    dayProp: "menstruationStrength",
    value: strength,
    selectedDate: selectedDay.id
  });
}