import { act } from "react";
import { renderWithProviders } from "@/redux/testUtils";
import BooleanItem from "./BooleanItem";

jest.mock("expo-sqlite");

const selectedDayId = "2025-01-05";

const mockBackgroundSwitch = jest.fn();
jest.mock("@/components/switch/BackgroundSwitch", () => ({
  BackgroundSwitch: (input: any) => mockBackgroundSwitch(input)
}));

const mockUpdateDay = jest.fn();
jest.mock("@/functions/db/updateDay", () => ({
  updateDay: (input: any) => mockUpdateDay(input)
}));

const type = "fatigue";

describe("BooleanItem", () => {
  it("fills BackgroundSwitch", async () => {
    renderBooleanItem();
    await expect(mockBackgroundSwitch).toHaveBeenCalledTimes(1);
    await expect(mockBackgroundSwitch).toHaveBeenCalledWith(expect.objectContaining({
      value: true,
      text: "Únava"
    }));
    await act(() => mockBackgroundSwitch.mock.calls[0][0].onValueChange(false));
    await expect(mockUpdateDay).toHaveBeenCalledTimes(1);
    await expect(mockUpdateDay).toHaveBeenCalledWith(expect.objectContaining({
      dayProp: type,
      value: 0,
      selectedDate: selectedDayId
    }));
  });
})

const renderBooleanItem = () => renderWithProviders(
  <BooleanItem type={type} tab="menstruation" />,
  {
    preloadedState: {
      days: {
        daysWithData: [],
        selectedDay: { id: selectedDayId, cycleId: 1, fatigue: 1 },
        potentialDays: []
      }
    }
  }
);