import { ChartBounds, MaybeNumber, PointsArray } from "victory-native"

type DetermineTemperaturePotentialAreaInput = {
  data: PointsArray,
  chartBounds: ChartBounds
}

export const determineTemperaturePotentialArea = ({
  data,
  chartBounds
}: DetermineTemperaturePotentialAreaInput) => {
  //TODO import AreaRangePointsArray
  const range: any[] = [];
  let minTemperature: MaybeNumber;
  let conditionFullfilled: boolean = false;
  let i = 0
  while (!conditionFullfilled && data.length > i) {
    if (data[i].y) {
      range.push({
        x: data[i].x,
        xValue: data[i].xValue,
        yValue: data[i].yValue,
        y: chartBounds.top,
        y0: chartBounds.bottom,
      });
      if (range.length > 7 && data[i - 1].y) {
        minTemperature = Math.min(...range.map(p => p.yValue!));
        conditionFullfilled = (data[i - 1].yValue! - minTemperature >= 0.05) && (data[i].yValue! - minTemperature >= 0.2);
      }
    }
    i++;
  }
  return range;
}