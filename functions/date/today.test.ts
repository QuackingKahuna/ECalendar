import { today } from "./today";
import { dateToDayId } from "./dateToDayId";

it("tests today format", () => {
  const testToday = new Date();
  expect(today()).toBe(dateToDayId(testToday));
})