import { RootState } from "@/redux/store";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./DetailTitle.styles";

export const DetailTitle = () => {
  const { selectedDay } = useSelector((state: RootState) => state.days);
  const sdate = new Date(selectedDay.id);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail{` ${sdate.getDate()}.${sdate.getMonth() + 1}.${sdate.getFullYear()}`}</Text>
    </View>)
}