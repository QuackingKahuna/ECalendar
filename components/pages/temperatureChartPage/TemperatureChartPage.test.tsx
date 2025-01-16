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
  getDays: (input: any) => mockGetDays(input)
}));

const temperatureData1: TemperatureChartData = { day: "2025-01-02", temperature: 36.34 };
const temperatureData2: TemperatureChartData = { day: "2025-01-17", temperature: 36.7 };

describe("TemperatureChartPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes TemperatureChart", () => {
    renderTemperatureChartPage();
    expect(mockTemperatureChart).toHaveBeenCalledTimes(1);
    expect(mockTemperatureChart).toHaveBeenCalledWith(expect.objectContaining({
      data: [temperatureData1, temperatureData2]
    }));
  });

  it("calls getDays and setDaysWithData on range select", async () => {
    const spyOnSetDaysWithData = jest.spyOn(DaysSlice, "setDaysWithData");
    renderTemperatureChartPage();
    expect(mockGetDays).toHaveBeenCalledTimes(0);
    expect(spyOnSetDaysWithData).toHaveBeenCalledTimes(0);
    const newRange = ["2025-01-04", "2025-01-05", "2025-01-06"];
    mockDatePicker.mock.calls[0][0].onDateRangeChange!(newRange);
    expect(mockGetDays).toHaveBeenCalledTimes(1);
    expect(mockGetDays).toHaveBeenCalledWith(newRange);
    expect(spyOnSetDaysWithData).toHaveBeenCalledTimes(1);
    expect(spyOnSetDaysWithData).toHaveBeenCalledWith(mockGetDaysReturn);
  })
});

const renderTemperatureChartPage = () => renderWithProviders(<TemperatureChartPage />, {
  preloadedState: {
    days: {
      daysWithData: [
        { id: temperatureData1.day, temperature: temperatureData1.temperature, cycleId: 1, },
        { id: "2025-01-04", cycleId: 1, sex: 1 },
        { id: temperatureData2.day, cycleId: 1, temperature: temperatureData2.temperature },
      ],
      potentialDays: [],
      selectedDay: { id: "2025-01-16", cycleId: 1, menstruationStrength: 1 },
      visibleMonth: "2025-16"
    }
  }
});