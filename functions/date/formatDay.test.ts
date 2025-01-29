import { formatDay } from "./formatDay";

describe("formatDay", () => {
  it("has expected format", () => {
    const sut = formatDay("2025-01-29");
    expect(sut).toBe("29.01.2025");
  })
})