import { getYearMonthFromDayId } from "@/functions/date/getYearMonthFromDayId";
import today from "@/functions/date/today";
import { Day } from "@/types/db/day";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DaysState = {
  daysWithData: Day[],
  potentialDays: Day[],
  selectedDay: Day,
  visibleMonth: string
}

const initialState: DaysState = {
  daysWithData: [],
  potentialDays: [],
  selectedDay: { id: today(), cycleId: -1 },
  visibleMonth: getYearMonthFromDayId(today())
}

const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    changeVisibleMonth: (state, action: PayloadAction<string>) => {
      state.visibleMonth = action.payload
    },
    setDaysWithData: (state, action: PayloadAction<Day[]>) => {
      state.daysWithData = action.payload;
    },
    updateSelectedDay: (state, action: PayloadAction<Day>) => {
      const index = state.daysWithData.findIndex(day => day.id === action.payload.id);
      if (index !== -1) {
        state.daysWithData[index] = action.payload;
      }
      else {
        state.daysWithData.push(action.payload);
      }
      state.selectedDay = action.payload;
    }
  },
});

export const { changeVisibleMonth, setDaysWithData, updateSelectedDay } = daysSlice.actions;
export default daysSlice.reducer;