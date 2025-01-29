import { getDayPartFromDayId } from "./getDayPartFromDayId";

it("tests getDayFromDayId", () => {
  expect(getDayPartFromDayId("2023-01-02")).toBe("02");
});