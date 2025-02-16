import { View } from "react-native";
import CalendarWithDayDetailPage from "@/components/pages/calendarWithDayDetailPage/CalendarWithDayDetailPage";
import { globalStyles } from "@/styles/globalStyles";

export const SignsCalendar = () => {
  return (
    <View style={[globalStyles.container, globalStyles.background]}>
      <CalendarWithDayDetailPage tab="signs" />
    </View>
  );
};

export default SignsCalendar;