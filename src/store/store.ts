import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentWetherSliceReducer from "./slices/currentWetherSlice";

const rootReducer = combineReducers({
    currentWetherSliceReducer,
})

export const store = configureStore({
    reducer:rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']