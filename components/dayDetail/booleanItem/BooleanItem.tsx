import { View } from "react-native"
import { useSQLiteContext } from "expo-sqlite";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundSwitch } from "@/components/switch/BackgroundSwitch";
import { updateDay } from "@/functions/db/updateDay";
import { updateSelectedDay } from "@/redux/daysSlice";
import { RootState } from "@/redux/store";
import { globalStyles } from "@/styles/container";
import { DayBooleanActionKeys } from "@/types/db/day"
import { getItemName } from "./BooleanItem.functions"


export const BooleanItem = ({ type }: { type: DayBooleanActionKeys }) => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { selectedDay } = useSelector((state: RootState) => state.days);
  const selected = selectedDay[type];
  return (
    <View style={globalStyles.container}>
      <BackgroundSwitch
        value={!!selected}
        onValueChange={async (value) => {
          const numericValue = value ? 1 : 0;
          dispatch(updateSelectedDay({ ...selectedDay, [type]: numericValue }));
          await updateDay({ db, dayProp: type, value: numericValue, selectedDate: selectedDay.id });
        }}
        text={getItemName(type)}
      />
    </View>
  )
}

export default BooleanItem;