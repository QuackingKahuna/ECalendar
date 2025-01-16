import { userEvent } from "@testing-library/react-native";
import { renderWithProviders } from "@/redux/testUtils";
import MenstruationItem from "./MenstruationItem";
import getMenstruationStrengthColors from "@/functions/styles/getMenstruationStrengthColors";

const user = userEvent.setup();

jest.mock("expo-sqlite");

const mockOnOptionPress = jest.fn();
jest.mock("./MenstruationItem.functions", () => {
  const originalModule = jest.requireActual("./MenstruationItem.functions");
  return {
    ...originalModule,
    onOptionPress: (input: any) => () => mockOnOptionPress(input),
  };
});

const mockBackgroundSwitch = jest.fn();
jest.mock("@/components/switch/BackgroundSwitch", () => {
  const originalModule = jest.requireActual("@/components/switch/BackgroundSwitch");
  return {
    ...originalModule,
    BackgroundSwitch: (input: any) => {
      mockBackgroundSwitch(input);
      return originalModule.BackgroundSwitch(input);
    }
  }
});

describe("MenstruationItem test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  const options = ["+", "1", "2", "3"];
  it("renders expected elements", () => {
    const mItem = renderWithProviders(<MenstruationItem />);
    const elements = ["Menstruace:", ...options];
    elements.forEach(element => expect(mItem.getByText(element)).toBeDefined());
  })

  it("tests that options are clickable", () => {
    const mItem = renderWithProviders(<MenstruationItem />);
    options.forEach(async (item, index) => {
      await user.press(mItem.getByText(item));
      await expect(mockOnOptionPress).toHaveBeenCalledTimes(index + 1);
    });
  })

  it("tests that selected option is highlighted", () => {
    const selectedStrength = 2;
    renderWithProviders(<MenstruationItem />, {
      preloadedState: {
        days: {
          selectedDay: { id: "2024-12-09", cycleId: 1, menstruationStrength: selectedStrength }, daysWithData: [],
          potentialDays: []
        }
      }
    });
    expect(mockBackgroundSwitch).toHaveBeenCalledWith(expect.objectContaining({
      value: true,
      onColor: getMenstruationStrengthColors(selectedStrength)!.backgroundColor
    }))
  })
})