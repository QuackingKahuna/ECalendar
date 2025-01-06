import today from "@/functions/calendar/today";
import reducer, { DaysState, updateSelectedDay } from "./daysSlice";

it("tests initial state", () => {
  expect(reducer(undefined, { type: "unknown" })).toEqual({
    daysInSelectedMonth: [],
    selectedDay: { id: today(), cycleId: -1 },
    potentialDays: []
  });
});

it("tests updateSelectedDay", () => {
  let selectedDay = { id: "2024-12-11", cycleId: 1, menstruationStrength: 1 };
  const previousState: DaysState = {
    daysInSelectedMonth: [
      { id: "2024-12-10", cycleId: 1, menstruationStrength: 2 },
      { ...selectedDay },
    ],
    selectedDay: { ...selectedDay },
    potentialDays: []
  };

  selectedDay = { ...selectedDay, menstruationStrength: 2 };
  let firstUpdatedState = {
    ...previousState,
    daysInSelectedMonth: [
      previousState.daysInSelectedMonth[0],
      { ...selectedDay },
    ],
    selectedDay
  };
  expect(reducer(previousState, updateSelectedDay(selectedDay))).toEqual(firstUpdatedState);

  const nextSelectedDay = { id: "2024-12-12", cycleId: 1, menstruationStrength: 3 };
  let secondUpdatedState = {
    ...firstUpdatedState,
    daysInSelectedMonth: [
      ...firstUpdatedState.daysInSelectedMonth,
      { ...nextSelectedDay }
    ],
    selectedDay: nextSelectedDay
  };
  expect(reducer(firstUpdatedState, updateSelectedDay(nextSelectedDay))).toEqual(secondUpdatedState);
});