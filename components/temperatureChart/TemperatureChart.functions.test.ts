import { determineTemperaturePotentialArea } from "./TemperatureChart.functions";

describe("TemperatureChart functions test", () => {
  it("check determineTemperaturePotentialArea points", () => {
    const chartBounds = { left: 0, right: 0, top: 30, bottom: 0 };
    const sharedData = [
      { x: 1, xValue: "1", yValue: 36.4 },
      { x: 2, xValue: "2", yValue: 36.42 },
      { x: 3, xValue: "3", yValue: 36.44 },
      { x: 4, xValue: "4", yValue: 36.46 },
      { x: 5, xValue: "5", yValue: 36.48 },
      { x: 6, xValue: "6", yValue: 36.5 },
      { x: 7, xValue: "7", yValue: 36.52 },
      { x: 8, xValue: "8", yValue: 36.6 }
    ]
    const sut = determineTemperaturePotentialArea({
      data: [
        ...sharedData.map((d) => ({ ...d, y: (d.yValue - 36.39) * 10 })),
        { x: 9, xValue: "9", yValue: 36.65, y: 26 },
      ],
      chartBounds
    });
    expect(sut).toEqual([
      ...sharedData.map((d) => ({ ...d, y: chartBounds.top, y0: chartBounds.bottom }))
    ])
  });
});