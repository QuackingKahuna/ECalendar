import { render, screen } from "@testing-library/react-native";
import { userEvent } from "@testing-library/react-native";
import BackgroundSwitch from "./BackgroundSwitch";

const user = userEvent.setup();

const mockOnValueChange = jest.fn();

describe("BackgroundSwitch", () => {
  it("calls onValueChange with oposite value", async () => {
    renderBackgroundSwitch();
    await user.press(screen.getByText("test"));
    expect(mockOnValueChange).toHaveBeenCalledWith(true);
  })
})

const renderBackgroundSwitch = () => render(
  <BackgroundSwitch value={false} onValueChange={(value) => mockOnValueChange(value)} text="test" />
);