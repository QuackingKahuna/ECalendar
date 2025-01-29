import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatDay } from "@/functions/date/formatDay";
import { styles } from "./DetailTitle.styles";

export const DetailTitle = () => {
  const { selectedDay } = useSelector((state: RootState) => state.days);
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>
        Detail{` ${formatDay(selectedDay.id)}`}
      </Text>
    </View>)
}