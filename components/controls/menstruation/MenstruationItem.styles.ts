import { StyleSheet } from "react-native";
import getMenstruationStrengthColors from "@/functions/styles/getMenstruationStrengthColors";
import { Day } from "@/types/db/day";

type GetOptionStylesInput = {
  options: string[]
  item: string;
  index: number;
  selectedDay: Day;
}

type GetOptionStylesOutput = { optionStyles: any[]; textColor: string }

export const getOptionStyles = ({ options, item, index, selectedDay }: GetOptionStylesInput): GetOptionStylesOutput => {
  let textColor = "black";
  const optionStyles: any[] = [styles.option];

  if (index === options.length - 1) {
    optionStyles.push(styles.lastOption);
  }
  if (item === "+") {
    optionStyles.push(styles.addBackground);
  }
  if (item === selectedDay.menstruationStrength?.toString()) {
    const optionColors = getMenstruationStrengthColors(selectedDay.menstruationStrength)!;
    optionStyles.push({ backgroundColor: optionColors.backgroundColor });
    textColor = optionColors.textColor;
  }

  return { optionStyles, textColor };
};

export const styles = StyleSheet.create({
  option: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderColor: "black",
    borderLeftWidth: 1,
    borderRadius: 0,
    borderTopWidth: 1,
    flex: 1,
    justifyContent: "center"
  },
  lastOption: {
    borderRightWidth: 1
  },
  addBackground: {
    backgroundColor: "rgb(162, 252, 163)"
  },
  itemContainer: {
    flexDirection: "row",
    height: 75
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    width: 140
  },
  titleColor: {
    color: "black"
  }
});