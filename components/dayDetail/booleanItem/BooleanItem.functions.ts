import { Day, DayBooleanActionKeys } from "@/types/db/day";
import { DayDetailTab } from "@/types/dayDetailTab";
import { UnknownAction } from "@reduxjs/toolkit";
import { SQLiteDatabase } from "expo-sqlite";
import { Dispatch } from "react";
import { updateSelectedDay } from "@/redux/daysSlice";
import { updateDay } from "@/functions/db/updateDay";
import { addSign, removeSign } from "@/redux/signSlice";

type DetermineSelectedInput = {
  tab: DayDetailTab,
  type: DayBooleanActionKeys,
  selectedDay: Day,
  selectedSigns: DayBooleanActionKeys[]
};

export const determineSelected = ({ tab, type, selectedDay, selectedSigns }: DetermineSelectedInput): boolean => {
  switch (tab) {
    case "menstruation":
      return !!selectedDay[type];
    case "signs":
      return selectedSigns.includes(type);
    default:
      const exhaustiveCheck: never = tab;
      return false;
  }
};

type OnPressInput = {
  db: SQLiteDatabase,
  dispatch: Dispatch<UnknownAction>,
  selectedDay: Day,
  type: DayBooleanActionKeys,
  tab: DayDetailTab,
}

export const onPress = ({ dispatch, db, selectedDay, type, tab }: OnPressInput) => async (value: boolean) => {
  switch (tab) {
    case "menstruation":
      const numericValue = value ? 1 : 0;
      dispatch(updateSelectedDay({ ...selectedDay, [type]: numericValue }));
      await updateDay({ db, dayProp: type, value: numericValue, selectedDate: selectedDay.id });
      break;
    case "signs":
      const reduxAction = value ? addSign : removeSign;
      dispatch(reduxAction(type));
      break;
    default:
      const exhaustiveCheck: never = tab;
  }
}

export const getItemName = (item: DayBooleanActionKeys): string => {
  switch (item) {
    case "sex":
      return "Sex";
    case "ovarypl":
      return "Bolest v levém vaječníku";
    case "ovarypr":
      return "Bolest v pravém vaječníku";
    case "hipp":
      return "Bolest kyčlí";
    case "stomachc":
      return "Křeče v břichu";
    case "stomacha":
      return "Bolest žaludku";
    case "fatigue":
      return "Únava";
    case "spinningHead":
      return "Motání hlavy";
    case "fertileMocus":
      return "Plodný hlen";
    case "sensitiveBreasts":
      return "Citlivé prsa";
    case "staining":
      return "Špinění";
    case "moodiness":
      return "Náladovost";
    case "cravings":
      return "Chutě";
    case "diarrhea":
      return "Průjem";
    case "sexp":
      return "Bolest při sexu";
    default:
      const exhaustiveCheck: never = item;
      return "should not happen";
  }
}