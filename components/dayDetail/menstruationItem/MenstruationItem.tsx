import { View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { onOptionPress } from "./MenstruationItem.functions";
import { getOptionColors } from "./MenstruationItem.styles";
import { BackgroundSwitch } from "@/components/switch/BackgroundSwitch";
import { globalStyles } from "@/styles/globalStyles";
import { Separator } from "@/components/Separator";
import { ItemWithTitle } from "../itemWithTitle/ItemWithTitle";

export const MenstruationItem = () => {
  const options = ["+", "1", "2", "3"];
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { selectedDay } = useSelector((state: RootState) => state.days);

  return (
    <ItemWithTitle title="Menstruace:">
      {
        options.map((item, index) => {
          const { backgroundColor, textColor } = getOptionColors({ item, selectedDay });
          return (
            <View key={index} style={[globalStyles.container, globalStyles.itemDirection]}>
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
    </ItemWithTitle>
  )
};

export default MenstruationItem;