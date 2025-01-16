import { resolveExpectedMenstruation } from "./resolveExpectedMenstruation";

jest.mock("expo-sqlite/kv-store");

const mockAddDays = jest.fn().mockReturnValue(new Date("2023-01-23"));
jest.mock("@/functions/date/addDays", () => ({
  addDays: (date, averageLength) => mockAddDays(date, averageLength)
}));

it("calls addDays with correct parameters", () => {
  resolveExpectedMenstruation({ currentCycleStartDate: "2023-01-01", lastCycles: [{ length: 20 }, { length: 21 }, { length: 25 }] });
  expect(mockAddDays).toHaveBeenCalledTimes(1);
  expect(mockAddDays).toHaveBeenCalledWith(new Date("2023-01-01"), 22);
});