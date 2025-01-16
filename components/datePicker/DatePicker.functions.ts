import { getRangeOfDays } from "@/functions/date/getRangeOfDays"
import { DayId } from "@/types/db/day"
import { Dispatch, SetStateAction } from "react"
import { DateData } from "react-native-calendars"

type OnDatePressInput = {
  dateRange: DayId[],
  onDateRangeChange: (newRange: string[]) => void,
  setDateRange: Dispatch<SetStateAction<DayId[]>>
}

export const onDayPress = ({ dateRange, onDateRangeChange, setDateRange }: OnDatePressInput) => (day: DateData) => {
  if (dateRange.length === 1) {
    const range = getRangeOfDays({ startDate: dateRange[0], endDate: day.dateString as DayId });
    setDateRange(range);
    onDateRangeChange(range);
  } else {
    setDateRange([day.dateString as DayId]);
  }
}

