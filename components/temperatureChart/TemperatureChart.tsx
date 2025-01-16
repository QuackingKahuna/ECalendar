import React from "react";
import { CartesianChart, Line, useChartPressState } from "victory-native"
import { TemperatureChartProps } from "./TemperatureChart.types"
import { Circle, Text, useFont } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { DayId } from "@/types/db/day";

const f = require("@/assets/fonts/SpaceMono-Regular.ttf");

export const TemperatureChart = ({ data }: TemperatureChartProps) => {
  const chartLabelFont = useFont(f, 12);
  const highlightedTextFont = useFont(f, 20);
  const { state: chartPressState, isActive } = useChartPressState
    <{ x: DayId | "", y: { temperature: number } }>
    ({ x: "", y: { temperature: 0 } });

  const value = useDerivedValue(() => {
    const res = chartPressState.y.temperature.value.value === 0
      || Number.isNaN(chartPressState.y.temperature.value.value)
      ? ""
      : `${chartPressState.x.value.value}: ${chartPressState.y.temperature.value.value.toFixed(2)}°C`;
    return res;
  }, [chartPressState]);

  return (
    <CartesianChart
      data={data}
      xKey="day"
      yKeys={["temperature"]}
      axisOptions={{ font: chartLabelFont }}
      domain={{ y: [36.2, 37.1] }}
      // TemperatureChartData type has day (x) as DayId, initialized state should provide "" option also
      chartPressState={chartPressState as any}
    >
      {({ points }) => (
        <>
          <Text x={100} y={40} text={value} font={highlightedTextFont} />
          <Line points={points.temperature} color="black" strokeWidth={1} />
          {isActive && (<Tooltip x={chartPressState.x.position} y={chartPressState.y.temperature.position} />)}
        </>
      )}
    </CartesianChart>
  )
}

const Tooltip = ({ x, y }: { x: SharedValue<number>, y: SharedValue<number> }) => {
  return (
    <>
      <Circle cx={x} cy={y} r={5} color="black" />
      <Circle cx={x} cy={y} r={4} color="White" />
    </>
  )
}