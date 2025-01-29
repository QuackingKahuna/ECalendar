import { getAllCycles, updateTemperatureData } from "./TemperatureChartPage.functions";

const lastCycle = { id: 2 };
const mockGetCyclesReturnValue = [lastCycle, { id: 1 }];
const mockGetCycles = jest.fn().mockReturnValue(mockGetCyclesReturnValue);
jest.mock("@/functions/db/getCycles", () => ({
  getCycles: (input: any) => mockGetCycles(input)
}));

const mockGetDaysReturnValue = [
  { id: "2025-01-02", temperature: 36.5, cycleId: 1 },
  { id: "2025-01-03", temperature: 36.7, cycleId: 1 },
];
const mockGetDays = jest.fn().mockReturnValue(mockGetDaysReturnValue);
jest.mock("@/functions/db/getDays", () => ({
  getDays: (input: any) => mockGetDays(input)
}));

describe("TemperatureChartPage functions test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("getAllCycles", async () => {
    const setCycles = jest.fn();
    const setCycle = jest.fn();
    await getAllCycles({ db: null as any, setCycles, setCycle });
    expect(setCycle).toHaveBeenCalledTimes(1);
    expect(setCycle).toHaveBeenCalledWith(lastCycle);
    expect(setCycles).toHaveBeenCalledTimes(1);
    expect(setCycles).toHaveBeenCalledWith(mockGetCyclesReturnValue);
  })

  it("updateTemperatureData", async () => {
    const setTemperatureData = jest.fn();
    const cycle = { startDate: "2024-11-25", endDate: "2025-01-06" };
    await updateTemperatureData({ db: null as any, cycle, setTemperatureData });
    expect(mockGetDays).toHaveBeenCalledTimes(1);
    expect(mockGetDays).toHaveBeenCalledWith(expect.objectContaining({
      params: {
        from: cycle.startDate,
        to: cycle.endDate
      }
    }));
    expect(setTemperatureData).toHaveBeenCalledTimes(1);
    expect(setTemperatureData).toHaveBeenCalledWith([
      { day: mockGetDaysReturnValue[0].id, temperature: mockGetDaysReturnValue[0].temperature },
      { day: mockGetDaysReturnValue[1].id, temperature: mockGetDaysReturnValue[1].temperature },
    ]);
  })
})