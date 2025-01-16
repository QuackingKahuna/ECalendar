import { View } from "react-native"
import { useSQLiteContext } from "expo-sqlite";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundSwitch } from "@/components/switch/BackgroundSwitch";
import { RootState } from "@/redux/store";
import { globalStyles } from "@/styles/globalStyles";
import { determineSelected, getItemName, onPress } from "./BooleanItem.functions"
import { BooleanItemProps } from "./BooleanItem.types";


export const BooleanItem = ({ tab, type }: BooleanItemProps) => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { selectedDay } = useSelector((state: RootState) => state.days);
  const { selectedSigns } = useSelector((state: RootState) => state.sign);
  const selected = determineSelected({ tab, type, selectedDay, selectedSigns });
  return (
    <View style={globalStyles.container}>
      <BackgroundSwitch
        value={!!selected}
        onValueChange={onPress({ dispatch, db, selectedDay, type, tab })}
        text={getItemName(type)}
      />
    </View>
  )
}

export default BooleanItem;