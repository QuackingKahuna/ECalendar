import { MENSTRUATION_MEDIUM, MENSTRUATION_STRONG, MENSTRUATION_WEAK } from "@/consts/colors";
import { ColorValue } from "react-native";

export type MenstruationStrengthColors = {
  backgroundColor: ColorValue;
  textColor: ColorValue;
}

export const getMenstruationStrengthColors = (strength: number | undefined) => {
  if (strength === 1) {
    return { backgroundColor: MENSTRUATION_WEAK, textColor: "black" };
  }
  else if (strength === 2) {
    return { backgroundColor: MENSTRUATION_MEDIUM, textColor: "white" };
  }
  else if (strength === 3) {
    return { backgroundColor: MENSTRUATION_STRONG, textColor: "white" };
  }
}

export default getMenstruationStrengthColors