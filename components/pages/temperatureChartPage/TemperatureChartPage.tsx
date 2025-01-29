import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { formatDay } from '@/functions/date/formatDay';
import { getAllCycles, updateTemperatureData } from './TemperatureChartPage.functions';
import { TemperatureChartData } from '@/components/temperatureChart/TemperatureChart.types';
import { TemperatureChart } from '@/components/temperatureChart/TemperatureChart';
import { globalStyles } from '@/styles/globalStyles';
import { Cycle } from '@/types/db/cycle';
import today from '@/functions/date/today';
import { List } from '@/components/list/List';
import BackgroundSwitch from '@/components/switch/BackgroundSwitch';
import { Separator } from '@/components/separator/Separator';
import { styles } from './TemperatureChartPage.styles';


export const TemperatureChartPage = () => {
  const db = useSQLiteContext();
  const [temperatureData, setTemperatureData] = useState<TemperatureChartData[]>([{ day: today(), temperature: undefined }]);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [cycle, setCycle] = useState<Cycle | null>(null);

  useEffect(() => {
    getAllCycles({ db, setCycles, setCycle });
  }, []);

  useEffect(() => {
    if (cycle) {
      updateTemperatureData({ db, cycle, setTemperatureData });
    }
  }, [cycle]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.chartHeight}>
        <TemperatureChart data={temperatureData} />
      </View>
      <Separator color='#000000' addShadow />
      <ScrollView>
        <List
          columns={2}
          items={cycles.map(c => ({
            columnWidth: 1,
            component: <BackgroundSwitch
              value={c.id === cycle?.id}
              onValueChange={() => { setCycle(c) }}
              text={`${formatDay(c.startDate)} - ${formatDay(c.endDate ?? today())}`}
              useShadow
            />
          }))}
        />
      </ScrollView>
    </View>
  )
}

export default TemperatureChartPage;