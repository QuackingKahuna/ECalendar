import { renderWithProviders } from "@/redux/testUtils";
import DayDetail from "./DayDetail";
import { Tab } from "@/types/db/tab";

jest.mock("expo-sqlite");

const mockMenstruationItem = jest.fn();
jest.mock("./menstruationItem/MenstruationItem", () => ({
  MenstruationItem: (input: any) => mockMenstruationItem(input)
}));

let tab: Tab;

describe("DayDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("menstruation tab", () => {
    beforeEach(() => {
      tab = "menstruation";
    })

    it("renders expected elements", () => {
      const dayDetail = renderDayDetail();
      expect(mockMenstruationItem).toHaveBeenCalledTimes(1);
      expect(dayDetail.getByText("Bolest kyčlí")).toBeDefined();
      expect(dayDetail.getByText("Únava")).toBeDefined();
      expect(dayDetail.getByText("Chutě")).toBeDefined();
    })
  });

  describe("sign tab", () => {
    beforeEach(() => {
      tab = "signs";
    })

    it("hides MenstruationItem", () => {
      const dayDetail = renderDayDetail();
      expect(mockMenstruationItem).toHaveBeenCalledTimes(0);
      expect(dayDetail.getByText("Bolest kyčlí")).toBeDefined();
      expect(dayDetail.getByText("Únava")).toBeDefined();
      expect(dayDetail.getByText("Chutě")).toBeDefined();
    })
  });
})

const renderDayDetail = () => renderWithProviders(<DayDetail tab={tab} />);