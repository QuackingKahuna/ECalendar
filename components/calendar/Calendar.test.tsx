import { act } from "react";
import { renderWithProviders } from "@/redux/testUtils";
import { MENSTRUATION_EXPECTED, MENSTRUATION_MEDIUM, MENSTRUATION_WEAK, POTENTIAL, SIGN } from "@/consts/colors";
import Calendar from "./Calendar";
import { resolveMarkedDatesStyles } from "./Calendar.styles";
import { Tab } from "@/types/db/tab";

jest.mock("expo-sqlite");
jest.mock("expo-sqlite/kv-store");

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
let tab: Tab;

describe("Calendar test", () => {
  beforeEach(() => {
    selectedDayId = "2024-12-10";
    jest.clearAllMocks();
  });

  describe("menstruation tab", () => {
    beforeEach(() => {
      tab = "menstruation";
    })

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
      it("tests markedDates styles", () => {
        const potentialDayId = "2024-12-11";
        const expectedMenstruation = "2024-12-17";
        const markedDatesStyles = resolveMarkedDatesStyles({
          daysInSelectedMonth: [
            { id: "2024-12-09", cycleId: 1, menstruationStrength: 1 },
            { id: selectedDayId, cycleId: 1, menstruationStrength: 2 },
            { id: potentialDayId, cycleId: 1, potential: 1 }
          ],
          expectedMenstruation,
          selectedDay: { id: selectedDayId, cycleId: 1, menstruationStrength: 2 },
          selectedSigns: [],
          tab
        });

        expect(markedDatesStyles).toEqual(expect.objectContaining({
          ["2024-12-09"]: {
            customStyles: {
              container: { backgroundColor: MENSTRUATION_WEAK },
              text: { color: "black" }
            }
          },
          [selectedDayId]: {
            selected: true,
            marked: true,
            dotColor: MENSTRUATION_MEDIUM
          },
          [potentialDayId]: {
            customStyles: {
              container: { backgroundColor: POTENTIAL },
            }
          },
          [expectedMenstruation]: {
            customStyles: {
              container: { backgroundColor: MENSTRUATION_EXPECTED },
            }
          }
        }));
      });

      it("tests that menstruation is not overriden by potential", () => {
        const markedDatesStyles = resolveMarkedDatesStyles({
          daysInSelectedMonth: [
            { id: "2024-12-09", cycleId: 1, menstruationStrength: 1, potential: 1 },
          ],
          expectedMenstruation: null,
          selectedDay: { id: selectedDayId, cycleId: 1 },
          selectedSigns: [],
          tab
        });
        expect(markedDatesStyles).toEqual(expect.objectContaining({
          ["2024-12-09"]: {
            customStyles: {
              container: { backgroundColor: MENSTRUATION_WEAK },
              text: { color: "black" }
            }
          }
        }));
      });
    });
  });

  describe("signs tab", () => {
    beforeEach(() => {
      tab = "signs";
    })

    it("tests markedDates styles", () => {
      const markedDatesStyles = resolveMarkedDatesStyles({
        daysInSelectedMonth: [
          { id: "2024-12-07", cycleId: 1, sex: 1 },
          { id: selectedDayId, cycleId: 1, sex: 0, fatigue: 1 },
          { id: "2024-12-12", cycleId: 1, ovarypl: 1 },
        ],
        expectedMenstruation: null,
        selectedDay: { id: selectedDayId, cycleId: 1, menstruationStrength: 2 },
        selectedSigns: ["sex", "ovarypl"],
        tab
      });

      expect(markedDatesStyles).toMatchObject({
        ["2024-12-07"]: {
          customStyles: {
            container: { backgroundColor: SIGN }
          }
        },
        ["2024-12-12"]: {
          customStyles: {
            container: { backgroundColor: SIGN }
          }
        }
      });
    })
  });
});

const renderCalendar = () => renderWithProviders(<Calendar tab={tab} />, {
  preloadedState: {
    days: {
      daysInSelectedMonth: [],
      selectedDay: { id: selectedDayId, cycleId: 1 },
      potentialDays: []
    }
  }
});;