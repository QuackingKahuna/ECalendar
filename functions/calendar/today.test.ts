import { today } from "./today";
import { dateToString } from "./dateToString";

it("tests today format", () => {
  const testToday = new Date();
  expect(today()).toBe(dateToString(testToday));
})