import { DateData } from "react-native-calendars";
import { onDayPress } from "./DatePicker.functions";
import { DayId } from "@/types/db/day";

const mockOnSetDateRange = jest.fn();
const mockOnDateRangeChange = jest.fn();

describe("DatePicker functions test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe("onDayPress", () => {
    const callOnDayPress = (dateRange: DayId[], selectedDate: DateData) => {
      onDayPress({
        dateRange,
        onDateRangeChange: mockOnDateRangeChange,
        setDateRange: mockOnSetDateRange
      })(selectedDate);
    }

    it("calls onDateRangeChange when second value is selected", () => {
      callOnDayPress(["2024-01-01"], { dateString: "2024-01-03" } as DateData);
      const expectedRange = ["2024-01-01", "2024-01-02", "2024-01-03"];
      expect(mockOnSetDateRange).toHaveBeenCalledTimes(1);
      expect(mockOnSetDateRange).toHaveBeenCalledWith(expectedRange);
      expect(mockOnDateRangeChange).toHaveBeenCalledTimes(1);
      expect(mockOnDateRangeChange).toHaveBeenCalledWith(expectedRange);
    })

    it("sets new new range when range already exists", () => {
      callOnDayPress(["2024-01-03", "2024-01-04"], { dateString: "2024-01-01" } as DateData);
      expect(mockOnSetDateRange).toHaveBeenCalledTimes(1);
      expect(mockOnSetDateRange).toHaveBeenCalledWith(["2024-01-01"]);
      expect(mockOnDateRangeChange).toHaveBeenCalledTimes(0);
    })
  })
});