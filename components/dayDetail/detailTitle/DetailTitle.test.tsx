import { renderWithProviders } from "@/redux/testUtils"
import { DetailTitle } from "./DetailTitle";

describe("DetailTitle", () => {
  it("renders Detail selected day", () => {
    const sut = renderDetailTitle();
    expect(sut.getByText("Detail 09.12.2024")).toBeDefined();
  })
})

const renderDetailTitle = () => renderWithProviders(<DetailTitle />, {
  preloadedState: {
    days: {
      selectedDay: { id: "2024-12-09", numericId: 20241209, cycleId: 1 },
      daysWithData: [],
      potentialDays: [],
      visibleMonth: "2024-12"
    }
  }
});