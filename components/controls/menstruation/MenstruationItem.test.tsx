import { userEvent } from "@testing-library/react-native";
import { renderWithProviders } from "@/redux/test-utils";
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

const mockBtn = jest.fn();
const mockText = jest.fn();
jest.mock("react-native-paper", () => {
  const originalModule = jest.requireActual("react-native-paper");
  return {
    ...originalModule,
    Button: (props: any) => {
      mockBtn(props);
      return originalModule.Button.render(props);
    },
    Text: (props: any) => {
      mockText(props);
      return originalModule.Text.render(props);
    },
  };
})

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
    const mItem = renderWithProviders(<MenstruationItem />, {
      preloadedState: {
        days: {
          selectedDay: { id: "2024-12-09", cycleId: 1, menstruationStrength: selectedStrength }, daysInSelectedMonth: []
        }
      }
    });
    const optionValue2Wrapper = mItem.getAllByTestId("button-container")[selectedStrength];
    expect(optionValue2Wrapper.props.style.backgroundColor).toEqual(getMenstruationStrengthColors(selectedStrength)!.backgroundColor);
  })
})