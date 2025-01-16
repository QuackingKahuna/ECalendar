import { getYearMonthFromDayId } from "./getYearMonthFromDayId";

it("tests getYearMonthFromDayId", () => {
  expect(getYearMonthFromDayId("2023-01-02")).toBe("2023-01");
});