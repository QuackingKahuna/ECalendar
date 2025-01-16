import { Day, DayId } from "@/types/db/day";
import { TemperatureChartData } from '@/components/temperatureChart/TemperatureChart.types';

type MapTemperatureDataInput = {
  daysWithData: Day[],
  selectedRange: DayId[]
};

export const mapTemperatureData = ({
  daysWithData,
  selectedRange
}: MapTemperatureDataInput
): TemperatureChartData[] => {
  return selectedRange.map(day => ({ day, temperature: daysWithData.find(d => d.id === day)?.temperature }))
};