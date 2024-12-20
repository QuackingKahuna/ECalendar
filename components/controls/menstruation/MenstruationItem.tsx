import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { onOptionPress } from "./MenstruationItem.functions";
import { getOptionStyles, styles } from "./MenstruationItem.styles";

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
          const { optionStyles, textColor } = getOptionStyles({ options, item, index, selectedDay });
          return (
            <Button
              mode="contained"
              style={optionStyles}
              textColor={textColor}
              onPress={async () => await onOptionPress({ item, db, selectedDay, dispatch })}
              key={`${index}${selectedDay.menstruationStrength}`}
            >
              {item}
            </Button>
          )
        })
      }
    </View >
  )
};

export default MenstruationItem;