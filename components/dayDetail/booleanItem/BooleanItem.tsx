import { useSQLiteContext } from "expo-sqlite";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundSwitch } from "@/components/switch/BackgroundSwitch";
import { RootState } from "@/redux/store";
import { determineSelected, getItemName, onPress } from "./BooleanItem.functions"
import { BooleanItemProps } from "./BooleanItem.types";


export const BooleanItem = ({ tab, type }: BooleanItemProps) => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { selectedDay } = useSelector((state: RootState) => state.days);
  const { selectedSigns } = useSelector((state: RootState) => state.sign);
  const selected = determineSelected({ tab, type, selectedDay, selectedSigns });
  return (
    <BackgroundSwitch
      value={!!selected}
      onValueChange={onPress({ dispatch, db, selectedDay, type, tab })}
      text={getItemName(type)}
    />
  )
}

export default BooleanItem;