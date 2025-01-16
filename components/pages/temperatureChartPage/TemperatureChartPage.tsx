import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DatePicker } from '@/components/datePicker/DatePicker';
import { useSQLiteContext } from 'expo-sqlite';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setDaysWithData } from '@/redux/daysSlice';
import { getDays } from '@/functions/db/getDays';
import { mapTemperatureData } from './TemperatureChartPage.functions';
import { TemperatureChartData } from '@/components/temperatureChart/TemperatureChart.types';
import { TemperatureChart } from '@/components/temperatureChart/TemperatureChart';
import { globalStyles } from '@/styles/globalStyles';
import { DayId } from '@/types/db/day';


export const TemperatureChartPage = () => {
  const db = useSQLiteContext();
  const dispatch = useDispatch();
  const { daysWithData } = useSelector((state: RootState) => state.days);
  const [selectedRange, setSelectedRange] = useState<DayId[]>(daysWithData?.map(day => day.id) || []);
  const [temperatureData, setTemperatureData] = useState<TemperatureChartData[]>(mapTemperatureData({ daysWithData, selectedRange }));

  useEffect(() => {
    setTemperatureData(mapTemperatureData({ daysWithData, selectedRange }));
  }, [daysWithData]);

  return (
    <View style={globalStyles.container}>
      <TemperatureChart data={temperatureData} />
      <DatePicker onDateRangeChange={
        async (newRange) => {
          setSelectedRange(newRange);
          dispatch(setDaysWithData(await getDays(db, newRange)));
        }
      } />
    </View>
  )
}

export default TemperatureChartPage;