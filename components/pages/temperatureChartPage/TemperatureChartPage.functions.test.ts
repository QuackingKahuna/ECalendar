import { mapTemperatureData } from "./TemperatureChartPage.functions";

describe("TemperatureChartPage functions test", () => {
  describe("mapTemperatureData", () => {
    it("maps data correctly", () => {
      const dayDataIn1 = { day: "2025-01-14", temperature: 36.5 }
      const dayDataIn2 = { day: "2025-01-15", temperature: 36.4 }
      const sut = mapTemperatureData({
        daysWithData: [
          { id: "2025-01-03", temperature: 36.45, },
          { id: dayDataIn1.day, temperature: dayDataIn1.temperature, cycleId: 1 },
          { id: dayDataIn2.day, temperature: dayDataIn2.temperature, cycleId: 1, sex: 1 }
        ],
        selectedRange: ["2025-01-14", "2025-01-15"]
      });

      expect(sut).toEqual([dayDataIn1, dayDataIn2]);
    })
  })
})