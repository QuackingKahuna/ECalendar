import { renderWithProviders } from "@/redux/test-utils";
import MainPage from "./MainPage";

jest.mock("expo-sqlite");
jest.mock("@/components/calendar/Calendar");
jest.mock("@/components/controls/menstruation/MenstruationItem");

const mockInitializeSelectedDayData = jest.fn();
jest.mock("./MainPage.functions", () => ({
  initializeSelectedDayData: (input: any) => mockInitializeSelectedDayData(input)
}));

const selectedDayId = "2024-12-11";

it("initializes selected day data", () => {
  renderWithProviders(<MainPage />, {
    preloadedState: {
      days: {
        selectedDay: { id: selectedDayId, cycleId: -1 },
        daysInSelectedMonth: []
      }
    }
  });
  expect(mockInitializeSelectedDayData).toHaveBeenCalledTimes(1);
  expect(mockInitializeSelectedDayData).toHaveBeenCalledWith(expect.objectContaining({
    selectedDayId
  }))
});