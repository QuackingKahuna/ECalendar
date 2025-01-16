import { onSubmit } from "./TemperatureItem.functions";

const mockUpdateSelectedDay = jest.fn();
jest.mock("@/redux/daysSlice", () => ({
  updateSelectedDay: (input: any) => mockUpdateSelectedDay(input)
}));

const mockUpdateDay = jest.fn();
jest.mock("@/functions/db/updateDay", () => ({
  updateDay: (input: any) => mockUpdateDay(input)
}));

describe("TemperatureItem functions test", () => {
  describe("onSubmit", () => {
    it("calls updateSelectedDay and updateDay", async () => {
      const selectedDayId = "2025-01-16";
      const selectedDay = { id: selectedDayId, sex: 1 }
      await onSubmit({
        db: null as any,
        dispatch: jest.fn(),
        selectedDay,
        temperature: "36.4"
      })();
      expect(mockUpdateSelectedDay).toHaveBeenCalledTimes(1);
      expect(mockUpdateSelectedDay).toHaveBeenCalledWith(expect.objectContaining({
        ...selectedDay,
        temperature: 36.4
      }));
      expect(mockUpdateDay).toHaveBeenCalledTimes(1);
      expect(mockUpdateDay).toHaveBeenCalledWith(expect.objectContaining({
        dayProp: "temperature",
        selectedDate: selectedDayId,
        value: 36.4
      }))
    })
  })
})