import { diffInDays } from "./diffInDays";

it("tests positive diffInDays", () => {
  expect(diffInDays("2023-01-01", "2023-01-02")).toBe(1);
})

it("tests negative diffInDays", () => {
  expect(diffInDays("2023-01-03", "2023-01-01")).toBe(2);
})

it("tests noDiff diffInDays", () => {
  expect(diffInDays("2023-01-03", "2023-01-03")).toBe(0);
})

it("tests month diffInDays", () => {
  expect(diffInDays("2023-01-01", "2023-02-01")).toBe(31);
})

it("tests year diffInDays", () => {
  expect(diffInDays("2023-01-01", "2024-01-01")).toBe(365);
})

it("tests Date input", () => {
  expect(diffInDays(new Date("2023-01-01"), new Date("2023-01-02"))).toBe(1);
})