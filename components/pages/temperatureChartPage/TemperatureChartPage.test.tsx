import * as DaysSlice from "@/redux/daysSlice";
import { renderWithProviders } from "@/redux/testUtils";
import { TemperatureChartData } from "@/components/temperatureChart/TemperatureChart.types";
import TemperatureChartPage from "./TemperatureChartPage";

jest.mock("expo-sqlite");

const mockTemperatureChart = jest.fn();
jest.mock("@/components/temperatureChart/TemperatureChart", () => ({
  TemperatureChart: (input: any) => mockTemperatureChart(input)
}));

const mockDatePicker = jest.fn();
jest.mock("@/components/datePicker/DatePicker", () => ({
  DatePicker: (input: any) => mockDatePicker(input)
}));

const mockGetDaysReturn = [
  { id: "2025-01-02", cycleId: 1, menstruationStrength: 1 },
  { id: "2025-01-17", cycleId: 1, menstruationStrength: 1 }
];
const mockGetDays = jest.fn().mockReturnValue(mockGetDaysReturn);
jest.mock("@/functions/db/getDays", () => ({
  getDays: (input1: any, input2: any) => mockGetDays(input1, input2)
}));

const temperatureData1: TemperatureChartData = { day: "2025-01-02", temperature: 36.34 };
const temperatureData2: TemperatureChartData = { day: "2025-01-04", temperature: undefined };
const temperatureData3: TemperatureChartData = { day: "2025-01-17", temperature: 36.7 };

describe("TemperatureChartPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes TemperatureChart", () => {
    renderTemperatureChartPage();
    //useEffect causes second call
    expect(mockTemperatureChart).toHaveBeenCalledTimes(2);
    expect(mockTemperatureChart).toHaveBeenCalledWith(expect.objectContaining({
      data: [temperatureData1, temperatureData2, temperatureData3]
    }));
  });

  it("calls getDays and setDaysWithData on range select", async () => {
    const spyOnSetDaysWithData = jest.spyOn(DaysSlice, "setDaysWithData");
    renderTemperatureChartPage();
    expect(mockGetDays).toHaveBeenCalledTimes(0);
    expect(spyOnSetDaysWithData).toHaveBeenCalledTimes(0);
    const newRange = ["2025-01-04", "2025-01-05", "2025-01-06"];
    await mockDatePicker.mock.calls[0][0].onDateRangeChange(newRange);
    expect(mockGetDays).toHaveBeenCalledTimes(1);
    expect(mockGetDays).toHaveBeenCalledWith(undefined, newRange);
    expect(spyOnSetDaysWithData).toHaveBeenCalledTimes(1);
    expect(spyOnSetDaysWithData).toHaveBeenCalledWith(mockGetDaysReturn);
  })
});

const renderTemperatureChartPage = () => renderWithProviders(<TemperatureChartPage />, {
  preloadedState: {
    days: {
      daysWithData: [
        { id: temperatureData1.day, cycleId: 1, temperature: temperatureData1.temperature, },
        { id: temperatureData2.day, cycleId: 1, temperature: temperatureData2.temperature, sex: 1 },
        { id: temperatureData3.day, cycleId: 1, temperature: temperatureData3.temperature },
      ],
      potentialDays: [],
      selectedDay: { id: "2025-01-16", cycleId: 1, menstruationStrength: 1 },
      visibleMonth: "2025-16"
    }
  }
});