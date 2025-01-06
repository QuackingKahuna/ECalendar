import { renderWithProviders } from "@/redux/testUtils";
import DayDetail from "./DayDetail";

jest.mock("expo-sqlite");

const mockMenstruationItem = jest.fn();
jest.mock("./menstruationItem/MenstruationItem", () => ({
  MenstruationItem: (input: any) => mockMenstruationItem(input)
}));

describe("DayDetail", () => {
  it("renders expected elements", () => {
    const dayDetail = renderDayDetail();
    expect(dayDetail.getByText("Bolest kyčlí")).toBeDefined();
    expect(dayDetail.getByText("Únava")).toBeDefined();
    expect(dayDetail.getByText("Chutě")).toBeDefined();
  })
})

const renderDayDetail = () => renderWithProviders(<DayDetail />);