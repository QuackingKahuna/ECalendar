import { changeSelectedDay, getDayDataForSelectedMonth } from "./Calendar.functions";

const dayFromDb = { id: "2024-12-11", cycleId: 1, menstruationStrength: 2 };
const mockGetDay = jest.fn().mockReturnValue(dayFromDb);
jest.mock("@/functions/db/getDay", () => ({
  getDay: (db, selectedDayId) => mockGetDay(db, selectedDayId)
}));

const mockUpdateSelectedDay = jest.fn();
const mockSetDaysInSelectedMonth = jest.fn();
jest.mock("@/redux/daysSlice", () => ({
  updateSelectedDay: (input: any) => mockUpdateSelectedDay(input),
  setDaysInSelectedMonth: (input: any) => mockSetDaysInSelectedMonth(input)
}))

const getDaysInMonthOutput = [
  { id: "2024-12-09", cycleId: 1, menstruationStrength: 1 },
  { id: "2024-12-10", cycleId: 1, menstruationStrength: 2 }
];
const mockGetDaysInMonth = jest.fn().mockReturnValue(getDaysInMonthOutput);
jest.mock("@/functions/db/getDaysInMonth", () => ({
  getDaysInMonth: (db, selectedMonth) => mockGetDaysInMonth(db, selectedMonth)
}));

const db = null as any;

it("changeSelectedDay calls getDay and updateSelectedDay", async () => {
  const selectedDayId = "2024-12-11";
  await changeSelectedDay({ db, selectedDayId, dispatch: jest.fn() });
  expect(mockGetDay).toHaveBeenCalledTimes(1);
  expect(mockGetDay).toHaveBeenCalledWith(db, selectedDayId);
  expect(mockUpdateSelectedDay).toHaveBeenCalledTimes(1);
  expect(mockUpdateSelectedDay).toHaveBeenCalledWith(dayFromDb);
});

it("getDayDataForSelectedMonth calls getDaysInMonth and setDaysInSelectedMonth", async () => {
  const selectedMonth = "2024-12";
  await getDayDataForSelectedMonth({ db, selectedMonth, dispatch: jest.fn() });
  expect(mockGetDaysInMonth).toHaveBeenCalledTimes(1);
  expect(mockGetDaysInMonth).toHaveBeenCalledWith(db, selectedMonth);
  expect(mockSetDaysInSelectedMonth).toHaveBeenCalledTimes(1);
  expect(mockSetDaysInSelectedMonth).toHaveBeenCalledWith(getDaysInMonthOutput);
});