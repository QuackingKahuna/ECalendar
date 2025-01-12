import { View } from "react-native";
import CalendarWithDayDetailPage from "@/components/pages/calendarWithDayDetailPage/CalendarWithDayDetailPage";
import { globalStyles } from "@/styles/container";

export const MenstruationCalendar = () => {
  return (
    <View style={globalStyles.container}>
      <CalendarWithDayDetailPage tab="menstruation" />
    </View>
  );
}

export default MenstruationCalendar;