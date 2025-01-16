import { dateToDayId } from "./dateToDayId";

it("returns expected format", () => {
  const result = dateToDayId(new Date("2023-01-01"));
  expect(result).toEqual("2023-01-01");
});