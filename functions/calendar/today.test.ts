import { today } from "./today";

it("tests today format", () => {
  const testToday = new Date();
  const year = testToday.getFullYear();
  const month = (testToday.getMonth() + 1) < 10 ? `0${testToday.getMonth() + 1}` : testToday.getMonth() + 1;
  const date = testToday.getDate() < 10 ? `0${testToday.getDate()}` : testToday.getDate();
  expect(today()).toBe(`${year}-${month}-${date}`);
})