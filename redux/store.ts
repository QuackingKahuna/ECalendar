import { combineReducers, configureStore } from "@reduxjs/toolkit";
import daysReducer from "@/redux/daysSlice";

const rootReducer = combineReducers({
  days: daysReducer
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];