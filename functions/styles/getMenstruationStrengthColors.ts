import { ColorValue } from "react-native";

export type MenstruationStrengthColors = {
  backgroundColor: ColorValue;
  textColor: ColorValue;
}

export const getMenstruationStrengthColors = (strength: number | undefined) => {
  if (strength === 1) {
    return { backgroundColor: "#f59090", textColor: "black" };
  }
  else if (strength === 2) {
    return { backgroundColor: "#db2727", textColor: "white" };
  }
  else if (strength === 3) {
    return { backgroundColor: "#a30303", textColor: "white" };
  }
}

export default getMenstruationStrengthColors