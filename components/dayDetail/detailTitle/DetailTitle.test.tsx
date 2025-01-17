import { renderWithProviders } from "@/redux/testUtils"
import { DetailTitle } from "./DetailTitle";

describe("DetailTitle", () => {
  it("renders Detail selected day", () => {
    const sut = renderDetailTitle();
    expect(sut.getByText("Detail 9.12.2024")).toBeDefined();
  })
})

const renderDetailTitle = () => renderWithProviders(<DetailTitle />, {
  preloadedState: {
    days: {
      selectedDay: { id: "2024-12-09", cycleId: 1 },
      daysWithData: [],
      potentialDays: [],
      visibleMonth: "2024-12"
    }
  }
});