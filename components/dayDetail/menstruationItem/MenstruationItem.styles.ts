import getMenstruationStrengthColors from "@/functions/styles/getMenstruationStrengthColors";
import { Day } from "@/types/db/day";
import { StyleSheet } from "react-native";
import { globalStyles } from "@/styles/globalStyles";

export const styles = StyleSheet.create({
  iconContainer: {
    ...globalStyles.center,
    flexDirection: "row",
    maxHeight: 40
  },
  optionContainer: {
    flex: 1,
    flexDirection: "row",
  }
});

type GetOptionStylesInput = {
  item: 1 | 2 | 3;
  selectedDay: Day;
}

type GetOptionStylesOutput = { backgroundColor: string; textColor: string }

export const getOptionColors = ({ item, selectedDay }: GetOptionStylesInput): GetOptionStylesOutput => {
  let textColor = "black";
  let backgroundColor = "transparent";

  if (item === selectedDay.menstruationStrength) {
    const optionColors = getMenstruationStrengthColors(selectedDay.menstruationStrength)!;
    backgroundColor = optionColors.backgroundColor;
    textColor = optionColors.textColor;
  }

  return { backgroundColor, textColor };
};