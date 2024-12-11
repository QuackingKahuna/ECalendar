import { act } from "react";
import { renderWithProviders } from "@/redux/test-utils";
import Calendar from "./Calendar";
import { resolveMarkedDatesStyles } from "./Calendar.styles";

jest.mock("expo-sqlite");

const mockGetDayDataForSelectedMonth = jest.fn();
const mockChangeSelectedDay = jest.fn();
jest.mock("./Calendar.functions", () => {
  const originalModule = jest.requireActual("./Calendar.functions");
  return {
    ...originalModule,
    getDayDataForSelectedMonth: (input: any) => mockGetDayDataForSelectedMonth(input),
    changeSelectedDay: (input: any) => mockChangeSelectedDay(input)
  }
});

const mockCalendarComponent = jest.fn();
jest.mock("react-native-calendars", () => {
  const originalModule = jest.requireActual("react-native-calendars");
  return {
    ...originalModule,
    Calendar: (props: any) => {
      mockCalendarComponent(props);
      return originalModule.Calendar(props);
    }
  }
})

let selectedDayId: string;

describe("Calendar test", () => {
  beforeEach(() => {
    selectedDayId = "2024-12-10";
    jest.clearAllMocks();
  });

  it("calls for month data", () => {
    renderCalendar();
    expect(mockGetDayDataForSelectedMonth).toHaveBeenCalledTimes(1);
    expect(mockGetDayDataForSelectedMonth).toHaveBeenCalledWith(expect.objectContaining({
      selectedMonth: "2024-12"
    }));
  });

  it("onDayPress calls changeSelectedDay", () => {
    renderCalendar();
    expect(mockChangeSelectedDay).toHaveBeenCalledTimes(0);
    mockCalendarComponent.mock.calls[0][0].onDayPress({ dateString: selectedDayId });
    expect(mockChangeSelectedDay).toHaveBeenCalledTimes(1);
    expect(mockChangeSelectedDay).toHaveBeenCalledWith(expect.objectContaining({
      selectedDayId
    }))
  });

  it("calls for month data on month change", async () => {
    renderCalendar();
    expect(mockGetDayDataForSelectedMonth).toHaveBeenCalledTimes(1);
    act(() => {
      mockCalendarComponent.mock.calls[0][0].onMonthChange({ dateString: "2024-11-01" })
    });
    expect(mockGetDayDataForSelectedMonth).toHaveBeenCalledTimes(2);
    expect(mockGetDayDataForSelectedMonth.mock.calls[1][0].selectedMonth).toEqual("2024-11");
  });

  describe("styles", () => {
    it("tests merkedDates styles", () => {
      const markedDatesStyles = resolveMarkedDatesStyles({
        daysInSelectedMonth: [
          { id: "2024-12-09", cycleId: 1, menstruationStrength: 1 },
          { id: selectedDayId, cycleId: 1, menstruationStrength: 2 }
        ],
        selectedDay: { id: selectedDayId, cycleId: 1, menstruationStrength: 2 }
      });

      expect(markedDatesStyles).toEqual(expect.objectContaining({
        ["2024-12-09"]: {
          customStyles: {
            container: { backgroundColor: "#f59090" },
            text: { color: "black" }
          }
        },
        [selectedDayId]: {
          selected: true,
          marked: true,
          dotColor: "#db2727"
        }
      }));
    });
  });
});

const renderCalendar = () => renderWithProviders(<Calendar />, {
  preloadedState: {
    days: {
      daysInSelectedMonth: [],
      selectedDay: { id: selectedDayId, cycleId: 1 },
    }
  }
});;