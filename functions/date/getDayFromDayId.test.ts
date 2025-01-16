import { getDayFromDayId } from "./getDayFromDayId";

it("tests getDayFromDayId", () => {
  expect(getDayFromDayId("2023-01-02")).toBe("02");
});