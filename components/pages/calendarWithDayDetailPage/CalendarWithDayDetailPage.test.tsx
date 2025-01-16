import { renderWithProviders } from "@/redux/testUtils";
import CalendarWithDayDetailPage from "./CalendarWithDayDetailPage";

jest.mock("expo-sqlite");
jest.mock("@/components/calendar/Calendar");
jest.mock("@/components/dayDetail/menstruationItem/MenstruationItem");

const mockInitializeReduxState = jest.fn();
jest.mock("./CalendarWithDayDetailPage.functions", () => ({
  initializeReduxState: (input: any) => mockInitializeReduxState(input)
}));

const selectedDayId = "2024-12-11";

it("initializes selected day data", () => {
  renderWithProviders(<CalendarWithDayDetailPage tab="menstruation" />, {
    preloadedState: {
      days: {
        selectedDay: { id: selectedDayId, cycleId: -1 },
        daysWithData: [],
        potentialDays: [],
        visibleMonth: "2024-12"
      }
    }
  });
  expect(mockInitializeReduxState).toHaveBeenCalledTimes(1);
  expect(mockInitializeReduxState).toHaveBeenCalledWith(expect.objectContaining({
    selectedDayId
  }))
});