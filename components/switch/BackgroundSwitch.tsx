import React, { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { SIGN } from "@/consts/colors";
import { globalStyles } from "@/styles/globalStyles";
import { styles } from "./BackgroundSwitch.styles";
import { BackgroundSwitchProps } from "./BackgroundSwitch.types";

export const BackgroundSwitch = ({
  value,
  onValueChange,
  onColor = SIGN,
  text,
  textColor = "black",
  icon,
  useShadow
}: BackgroundSwitchProps) => {
  let title: ReactNode;
  let backgroundColor = "transparent";
  if (text) {
    if (value && !useShadow) {
      backgroundColor = onColor
    }
    title = (
      <Text style={[globalStyles.itemTitleText, { color: textColor }]} >
        {text}
      </Text>
    );
  } else {
    title = icon
  }

  if (useShadow && value) {
    title = (
      <Shadow
        distance={10}
        startColor={`${onColor}55`}
        paintInside
        style={styles.shadowStyle}
      >
        {title}
      </Shadow>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={() => onValueChange(!value)}
    >
      {title}
    </TouchableOpacity >
  );
}

export default BackgroundSwitch;