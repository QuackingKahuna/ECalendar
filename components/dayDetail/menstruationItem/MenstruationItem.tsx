import { View } from "react-native";
import { Text } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { onOptionPress } from "./MenstruationItem.functions";
import { getOptionColors, styles } from "./MenstruationItem.styles";
import { BackgroundSwitch } from "@/components/switch/BackgroundSwitch";
import { globalStyles } from "@/styles/container";
import { Separator } from "@/components/Separator";

export const MenstruationItem = () => {
  const options = ["+", "1", "2", "3"];
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { selectedDay } = useSelector((state: RootState) => state.days);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.title}>
        <Text variant="headlineSmall" style={styles.titleColor} >Menstruace:</Text>
      </View>
      {
        options.map((item, index) => {
          const { backgroundColor, textColor } = getOptionColors({ item, selectedDay });
          return (
            <View key={index} style={[globalStyles.container, { flexDirection: "row" }]}>
              <Separator orientation="vertical" />
              <BackgroundSwitch
                value={item === selectedDay.menstruationStrength?.toString()}
                onValueChange={async () => await onOptionPress({ item, db, selectedDay, dispatch })}
                text={item}
                onColor={backgroundColor}
                offColor={item === "+" ? backgroundColor : undefined}
                textColor={textColor}
              />
            </View>
          )
        })
      }
    </View >
  )
};

export default MenstruationItem;