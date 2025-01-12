import { Text, TouchableOpacity } from "react-native";
import { BackgroundSwitchProps } from "./BackgroundSwitch.types";
import { globalStyles } from "@/styles/container";
import { styles } from "./BackgroundSwitch.styles";
import { SIGN } from "@/consts/colors";

export const BackgroundSwitch = ({
  value,
  onValueChange,
  onColor = SIGN,
  offColor = "transparent",
  text,
  textColor = "black" }: BackgroundSwitchProps) => {
  return (
    <TouchableOpacity
      style={[globalStyles.container, styles.button,
      { backgroundColor: value ? onColor : offColor }]}
      onPress={() => onValueChange(!value)}
    >
      <Text style={[styles.title, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

export default BackgroundSwitch;