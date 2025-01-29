import { View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useSelector, useDispatch } from "react-redux";
import { ItemWithTitle } from "@/components/dayDetail/itemWithTitle/ItemWithTitle";
import { Separator } from "@/components/separator/Separator";
import { BackgroundSwitch } from "@/components/switch/BackgroundSwitch";
import { GREY } from "@/consts/colors";
import { RootState } from "@/redux/store";
import { onOptionPress } from "./MenstruationItem.functions";
import { getOptionColors, styles } from "./MenstruationItem.styles";
import { OptionValue } from "./MenstruationItem.types";
import { Icon } from "@/components/icon/Icon";

export const MenstruationItem = () => {
  const options: OptionValue[] = [1, 2, 3];
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { selectedDay, daysWithData } = useSelector((state: RootState) => state.days);

  return (
    <ItemWithTitle title="Menstruace:">
      {options.map((item) => {
        const { backgroundColor } = getOptionColors({ item, selectedDay });
        const value = item === selectedDay.menstruationStrength;
        return (<View key={item} style={styles.optionContainer}>
          <Separator orientation="vertical" />
          <BackgroundSwitch
            onColor={backgroundColor}
            onValueChange={async () => await onOptionPress({ item, db, selectedDay, dispatch, daysWithData })}
            useShadow
            value={value}
            icon={
              <View style={[styles.iconContainer, { width: (15 * item) + 10 }]}>
                {Array.from({ length: item }, (_, i) => (
                  <Icon key={`${item}${i}`} color={value ? backgroundColor : GREY} />
                ))}
              </View>
            }
          />
        </View>)
      })}
    </ItemWithTitle>
  )
};

export default MenstruationItem;