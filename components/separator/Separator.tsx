import { DimensionValue, View } from "react-native";
import { SeparatorProps } from "./Separator.types";
import { Shadow } from "react-native-shadow-2";
import { GREY } from "@/consts/colors";

export const Separator = ({
  orientation = "horizontal",
  color = GREY,
  addShadow
}: SeparatorProps) => {
  let height: DimensionValue;
  let width: DimensionValue;

  const backgroundColor = color;
  if (orientation === "vertical") {
    height = "100%";
    width = 1;
  } else {
    height = 1;
    width = "100%";
  }

  let separator = <View
    style={{
      height,
      width,
      backgroundColor,
    }}
  />

  if (addShadow) {
    separator = (
      <Shadow
        distance={5}
        sides={{ top: false, start: false, bottom: true, end: false }}
        startColor={`${color}35`}
      >
        {separator}
      </Shadow>
    );
  }

  return separator;
}