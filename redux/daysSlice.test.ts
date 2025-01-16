import today from "@/functions/date/today";
import { getYearMonthFromDayId } from "@/functions/date/getYearMonthFromDayId";
import reducer, { DaysState, updateSelectedDay } from "./daysSlice";

it("tests initial state", () => {
  expect(reducer(undefined, { type: "unknown" })).toEqual({
    daysWithData: [],
    selectedDay: { id: today(), cycleId: -1 },
    potentialDays: [],
    visibleMonth: getYearMonthFromDayId(today())
  });
});

it("tests updateSelectedDay", () => {
  let selectedDay = { id: "2024-12-11", cycleId: 1, menstruationStrength: 1 };
  const previousState: DaysState = {
    daysWithData: [
      { id: "2024-12-10", cycleId: 1, menstruationStrength: 2 },
      { ...selectedDay },
    ],
    selectedDay: { ...selectedDay },
    potentialDays: [],
    visibleMonth: getYearMonthFromDayId(selectedDay.id)
  };

  selectedDay = { ...selectedDay, menstruationStrength: 2 };
  let firstUpdatedState = {
    ...previousState,
    daysWithData: [
      previousState.daysWithData[0],
      { ...selectedDay },
    ],
    selectedDay
  };
  expect(reducer(previousState, updateSelectedDay(selectedDay))).toEqual(firstUpdatedState);

  const nextSelectedDay = { id: "2024-12-12", cycleId: 1, menstruationStrength: 3 };
  let secondUpdatedState = {
    ...firstUpdatedState,
    daysWithData: [
      ...firstUpdatedState.daysWithData,
      { ...nextSelectedDay }
    ],
    selectedDay: nextSelectedDay
  };
  expect(reducer(firstUpdatedState, updateSelectedDay(nextSelectedDay))).toEqual(secondUpdatedState);
});