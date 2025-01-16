import { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { resolveMarkedDatesStyles } from "./DatePicker.styles";
import { DatePickerProps } from "./DatePicker.types";
import { onDayPress } from "./DatePicker.functions";
import { DayId } from "@/types/db/day";

export const DatePicker = ({ onDateRangeChange }: DatePickerProps) => {
  const [dateRange, setDateRange] = useState<DayId[]>([]);

  return (
    <View>
      <Calendar
        onDayPress={onDayPress({ dateRange, onDateRangeChange, setDateRange })}
        markingType={"custom"}
        markedDates={resolveMarkedDatesStyles({ days: dateRange })}
        firstDay={1}
        enableSwipeMonths
      />
    </View>
  )
};

export default DatePicker;