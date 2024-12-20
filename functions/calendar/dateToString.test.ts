import { dateToString } from "./dateToString";

it("returns expected format", () => {
  const result = dateToString(new Date("2023-01-01"));
  expect(result).toEqual("2023-01-01");
});