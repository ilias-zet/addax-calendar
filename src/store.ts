import { configureStore } from "@reduxjs/toolkit";
import draggingReducer from "./features/draggingSlice";
import taskListReducer from "./features/taskListSlice";

export const store = configureStore({
  reducer: {
    dragging: draggingReducer,
    tasklist: taskListReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
