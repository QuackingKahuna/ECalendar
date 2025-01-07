import today from "@/functions/calendar/today";
import { Day } from "@/types/db/day";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DaysState = {
  daysInSelectedMonth: Day[],
  potentialDays: Day[],
  selectedDay: Day
}

const initialState: DaysState = {
  daysInSelectedMonth: [],
  potentialDays: [],
  selectedDay: { id: today(), cycleId: -1 }
}

const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    setDaysInSelectedMonth: (state, action: PayloadAction<Day[]>) => {
      state.daysInSelectedMonth = action.payload;
    },
    updateSelectedDay: (state, action: PayloadAction<Day>) => {
      const index = state.daysInSelectedMonth.findIndex(day => day.id === action.payload.id);
      if (index !== -1) {
        state.daysInSelectedMonth[index] = action.payload;
      }
      else {
        state.daysInSelectedMonth.push(action.payload);
      }
      state.selectedDay = action.payload;
    }
  },
});

export const { setDaysInSelectedMonth, updateSelectedDay } = daysSlice.actions;
export default daysSlice.reducer;