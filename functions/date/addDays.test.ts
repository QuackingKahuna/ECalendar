import { addDays } from "./addDays";

it("returns the correct date", () => {
  const result = addDays(new Date("2023-01-01"), 5);
  expect(result).toEqual(new Date("2023-01-06"));
});

it("modifies the original date", () => {
  const testDate = new Date("2023-01-01");
  addDays(testDate, 5);
  expect(testDate).toEqual(new Date("2023-01-06"));
});