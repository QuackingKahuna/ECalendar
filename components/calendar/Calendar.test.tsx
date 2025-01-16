import { act } from "react";
import { renderWithProviders } from "@/redux/testUtils";
import { MENSTRUATION_EXPECTED, MENSTRUATION_MEDIUM, MENSTRUATION_WEAK, POTENTIAL, SIGN } from "@/consts/colors";
import Calendar from "./Calendar";
import { resolveMarkedDatesStyles } from "./Calendar.styles";
import { DayDetailTab } from "@/types/dayDetailTab";
import { DayId } from "@/types/db/day";
import * as DaysSlice from "@/redux/daysSlice";

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

let selectedDayId: DayId;
let tab: DayDetailTab;
let month: string;

describe("Calendar test", () => {
  beforeEach(() => {
    selectedDayId = "2024-12-10";
    month = "2024-12";
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
        selectedMonth: month
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
      const year = 2024;
      const month = 11;
      const spyOnChangeVisibleMonth = jest.spyOn(DaysSlice, "changeVisibleMonth");
      renderCalendar();
      expect(spyOnChangeVisibleMonth).toHaveBeenCalledTimes(1);
      expect(mockGetDayDataForSelectedMonth).toHaveBeenCalledTimes(1);
      act(() => {
        mockCalendarComponent.mock.calls[0][0].onMonthChange({ year, month });
      });
      const newMonth = `${year}-${month}`
      //After the act, there is a rerender which causes extra call
      expect(spyOnChangeVisibleMonth).toHaveBeenCalledTimes(3);
      expect(spyOnChangeVisibleMonth).toHaveBeenCalledWith(newMonth);
      expect(mockGetDayDataForSelectedMonth).toHaveBeenCalledTimes(2);
      expect(mockGetDayDataForSelectedMonth.mock.calls[1][0].selectedMonth).toEqual(newMonth);
    });

    describe("styles", () => {
      it("tests markedDates styles", () => {
        const potentialDayIdStart = "2024-12-11";
        const potentialDayIdEnd = "2024-12-12";
        const expectedMenstruation = "2024-12-17";
        const markedDatesStyles = resolveMarkedDatesStyles({
          daysWithData: [
            { id: "2024-12-09", cycleId: 1, menstruationStrength: 1 },
            { id: selectedDayId, cycleId: 1, menstruationStrength: 2 },
            { id: potentialDayIdStart, cycleId: 1, potential: 1 },
            { id: potentialDayIdEnd, cycleId: 1, potential: 1 }
          ],
          expectedMenstruation,
          selectedDay: { id: selectedDayId, cycleId: 1, menstruationStrength: 2 },
          selectedSigns: [],
          tab
        });

        expect(markedDatesStyles).toEqual(expect.objectContaining({
          ["2024-12-09"]: {
            customStyles: {
              container: {
                backgroundColor: MENSTRUATION_WEAK,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
                width: 60
              },
              text: { color: "black" }
            }
          },
          [selectedDayId]: {
            selected: true,
            marked: true,
            dotColor: MENSTRUATION_MEDIUM
          },
          [potentialDayIdStart]: {
            customStyles: {
              container: {
                backgroundColor: POTENTIAL,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
                width: 60
              }
            }
          },
          [potentialDayIdEnd]: {
            customStyles: {
              container: {
                backgroundColor: POTENTIAL,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                width: 60
              }
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
          daysWithData: [
            { id: "2024-12-09", cycleId: 1, menstruationStrength: 1, potential: 1 },
          ],
          expectedMenstruation: null,
          selectedDay: { id: selectedDayId, cycleId: 1 },
          selectedSigns: [],
          tab
        });
        expect(markedDatesStyles).toMatchObject({
          ["2024-12-09"]: {
            customStyles: {
              container: { backgroundColor: MENSTRUATION_WEAK },
              text: { color: "black" }
            }
          }
        });
      });
    });
  });

  describe("signs tab", () => {
    beforeEach(() => {
      tab = "signs";
    })

    it("tests markedDates styles", () => {
      const markedDatesStyles = resolveMarkedDatesStyles({
        daysWithData: [
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
      daysWithData: [],
      selectedDay: { id: selectedDayId, cycleId: 1 },
      potentialDays: [],
      visibleMonth: month
    }
  }
});;