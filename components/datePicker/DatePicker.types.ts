import { DayId } from "@/types/db/day"

export type DatePickerProps = {
  onDateRangeChange: (newRange: DayId[]) => void
}