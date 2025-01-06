import { DayBooleanActionKeys } from "@/types/db/day";

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
    default:
      const exhaustiveCheck: never = item;
      return "should not happen";
  }
}