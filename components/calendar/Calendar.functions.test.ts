import { changeSelectedDay, getDayDataForSelectedMonth } from "./Calendar.functions";

const dayFromDb = { id: "2024-12-11", cycleId: 1, menstruationStrength: 2 };
const mockGetDay = jest.fn().mockReturnValue(dayFromDb);
jest.mock("@/functions/db/getDay", () => ({
  getDay: (db, selectedDayId) => mockGetDay(db, selectedDayId)
}));

const mockUpdateSelectedDay = jest.fn();
const mockSetDaysWithData = jest.fn();
jest.mock("@/redux/daysSlice", () => ({
  updateSelectedDay: (input: any) => mockUpdateSelectedDay(input),
  setDaysWithData: (input: any) => mockSetDaysWithData(input)
}))

const getDaysOutput = [
  { id: "2024-12-09", cycleId: 1, menstruationStrength: 1 },
  { id: "2024-12-10", cycleId: 1, menstruationStrength: 2 }
];
const mockGetDays = jest.fn().mockReturnValue(getDaysOutput);
jest.mock("@/functions/db/getDays", () => ({
  getDays: (input: any) => mockGetDays(input)
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

it("getDayDataForSelectedMonth calls getDays and setDaysInSelectedMonth", async () => {
  const selectedMonth = "2024-12";
  await getDayDataForSelectedMonth({ db, selectedMonth, dispatch: jest.fn() });
  expect(mockGetDays).toHaveBeenCalledTimes(1);
  expect(mockGetDays).toHaveBeenCalledWith(expect.objectContaining({
    params: { from: 20241125, to: 20250106 }
  }));
  expect(mockSetDaysWithData).toHaveBeenCalledTimes(1);
  expect(mockSetDaysWithData).toHaveBeenCalledWith(getDaysOutput);
});