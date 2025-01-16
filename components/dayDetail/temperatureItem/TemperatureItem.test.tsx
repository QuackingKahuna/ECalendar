import { renderWithProviders } from "@/redux/testUtils";
import { TemperatureItem } from "./TemperatureItem";

let temperature: number;

describe("TemperatureItem", () => {
  beforeEach(() => {
    temperature = 36.4;
  })

  it("renders expected elements", () => {
    const sut = renderTemperatureItem();
    expect(sut.getByText("Teplota:")).toBeDefined();
    expect(sut.getByText("°C")).toBeDefined();
    expect(sut.getByText(`${temperature}`)).toBeDefined();
  })
});

const renderTemperatureItem = () => renderWithProviders(<TemperatureItem />, {
  preloadedState: {
    days: {
      daysWithData: [],
      potentialDays: [],
      selectedDay: { id: "2025-01-16", cycleId: 1, temperature },
      visibleMonth: "2025-01"
    }
  }
});