import { getRangeOfDays } from "./getRangeOfDays";

it("tests getRangeOfDays", () => {
  expect(getRangeOfDays({ startDate: "2023-01-30", endDate: "2023-02-02" })).toEqual(["2023-01-30", "2023-01-31", "2023-02-01", "2023-02-02"]);
});