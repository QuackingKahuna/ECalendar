import { combineReducers, configureStore } from "@reduxjs/toolkit";
import daysReducer from "@/redux/daysSlice";
import signReducer from "@/redux/signSlice";

const rootReducer = combineReducers({
  days: daysReducer,
  sign: signReducer
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