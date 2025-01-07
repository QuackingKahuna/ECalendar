import { View } from "react-native";
import CalendarWithDayDetailPage from "@/components/pages/calendarWithDayDetailPage/CalendarWithDayDetailPage";
import { globalStyles } from "@/styles/container";

export const SignsCalendar = () => {
  return (
    <View style={globalStyles.container}>
      <CalendarWithDayDetailPage tab="signs" />
    </View>
  );
};

export default SignsCalendar;