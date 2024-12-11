import { initializeSelectedDayData } from "./MainPage.functions";

const selectedDay = { id: "2024-12-11", cycleId: 1, menstruationStrength: 2 };

jest.mock("@/functions/db/getDay", () => ({
  getDay: () => selectedDay
}));

const mockUpdateSelectedDay = jest.fn();
jest.mock("@/redux/daysSlice", () => ({
  updateSelectedDay: (input: any) => mockUpdateSelectedDay(input)
}));

it("calls updateSelectedDay", async () => {
  await initializeSelectedDayData({
    db: null as any,
    selectedDayId: selectedDay.id,
    dispatch: jest.fn()
  });
  expect(mockUpdateSelectedDay).toHaveBeenCalledTimes(1);
  expect(mockUpdateSelectedDay).toHaveBeenCalledWith(selectedDay)
}); 