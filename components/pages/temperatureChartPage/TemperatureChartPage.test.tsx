import { TemperatureChartData } from "@/components/temperatureChart/TemperatureChart.types";
import * as DaysSlice from "@/redux/daysSlice";
import { renderWithProviders } from "@/redux/testUtils";
import TemperatureChartPage from "./TemperatureChartPage";
import { toNumericId } from "@/functions/db/toNumericId";

jest.mock("expo-sqlite");

const mockTemperatureChart = jest.fn();
jest.mock("@/components/temperatureChart/TemperatureChart", () => ({
  TemperatureChart: (input: any) => mockTemperatureChart(input)
}));

const mockDatePicker = jest.fn();
jest.mock("@/components/datePicker/DatePicker", () => ({
  DatePicker: (input: any) => mockDatePicker(input)
}));

const mockGetCyclesReturn = [
  { id: "2025-01-02", cycleId: 1, menstruationStrength: 1 },
  { id: "2025-01-17", cycleId: 1, menstruationStrength: 1 }
];
const mockGetCycles = jest.fn().mockReturnValue(mockGetCyclesReturn);
jest.mock("@/functions/db/getCycles", () => ({
  getCycles: (input1: any) => mockGetCycles(input1)
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
});

const renderTemperatureChartPage = () => renderWithProviders(<TemperatureChartPage />, {
  preloadedState: {
    days: {
      daysWithData: [
        { id: temperatureData1.day, cycleId: 1, temperature: temperatureData1.temperature, numericId: toNumericId(temperatureData1.day) },
        { id: temperatureData2.day, cycleId: 1, temperature: temperatureData2.temperature, sex: 1, numericId: toNumericId(temperatureData2.day) },
        { id: temperatureData3.day, cycleId: 1, temperature: temperatureData3.temperature, numericId: toNumericId(temperatureData3.day) },
      ],
      potentialDays: [],
      selectedDay: { id: "2025-01-16", numericId: 20250116, cycleId: 1, menstruationStrength: 1 },
      visibleMonth: "2025-16"
    }
  }
});