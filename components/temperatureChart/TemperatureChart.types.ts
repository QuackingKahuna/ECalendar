import { DayId } from "@/types/db/day"

export type TemperatureChartData = {
  day: DayId | "",
  temperature: number | undefined
}

export type TemperatureChartProps = {
  data: TemperatureChartData[],
}