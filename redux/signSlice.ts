import { DayBooleanActionKeys } from "@/types/db/day"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type SignState = {
  selectedSigns: DayBooleanActionKeys[]
}

const initialState: SignState = {
  selectedSigns: []
}

const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    addSign: (state, action: PayloadAction<DayBooleanActionKeys>) => {
      state.selectedSigns.push(action.payload)
    },
    removeSign: (state, action: PayloadAction<DayBooleanActionKeys>) => {
      state.selectedSigns = state.selectedSigns.filter(sign => sign !== action.payload)
    }
  }
});

export const { addSign, removeSign } = signSlice.actions;
export default signSlice.reducer;