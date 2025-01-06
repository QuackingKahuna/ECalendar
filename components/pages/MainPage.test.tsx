import { renderWithProviders } from "@/redux/testUtils";
import MainPage from "./MainPage";

jest.mock("expo-sqlite");
jest.mock("@/components/calendar/Calendar");
jest.mock("@/components/dayDetail/menstruationItem/MenstruationItem");

const mockInitializeReduxState = jest.fn();
jest.mock("./MainPage.functions", () => ({
  initializeReduxState: (input: any) => mockInitializeReduxState(input)
}));

const selectedDayId = "2024-12-11";

it("initializes selected day data", () => {
  renderWithProviders(<MainPage />, {
    preloadedState: {
      days: {
        selectedDay: { id: selectedDayId, cycleId: -1 },
        daysInSelectedMonth: [],
        potentialDays: []
      }
    }
  });
  expect(mockInitializeReduxState).toHaveBeenCalledTimes(1);
  expect(mockInitializeReduxState).toHaveBeenCalledWith(expect.objectContaining({
    selectedDayId
  }))
});