import { configureStore } from "@reduxjs/toolkit";
import draggingReducer from "./features/draggingSlice";

export const store = configureStore({
  reducer: {
    dragging: draggingReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
