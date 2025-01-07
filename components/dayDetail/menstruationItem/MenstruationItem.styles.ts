import { StyleSheet } from "react-native";
import getMenstruationStrengthColors from "@/functions/styles/getMenstruationStrengthColors";
import { Day } from "@/types/db/day";

type GetOptionStylesInput = {
  item: string;
  selectedDay: Day;
}

type GetOptionStylesOutput = { backgroundColor: string; textColor: string }

export const getOptionColors = ({ item, selectedDay }: GetOptionStylesInput): GetOptionStylesOutput => {
  let textColor = "black";
  let backgroundColor = "transparent";

  if (item === "+") {
    backgroundColor = "#a2fca3";
  }
  if (item === selectedDay.menstruationStrength?.toString()) {
    const optionColors = getMenstruationStrengthColors(selectedDay.menstruationStrength)!;
    backgroundColor = optionColors.backgroundColor;
    textColor = optionColors.textColor;
  }

  return { backgroundColor, textColor };
};

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    height: 75
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    width: 140
  },
  titleText: {
    fontSize: 20,
    textAlign: "center"
  }
});