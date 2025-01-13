import { configureStore } from "@reduxjs/toolkit";
import draggingReducer from "./features/draggingSlice";
import taskListReducer from "./features/taskListSlice";
import editTaskReducer from "./features/editTaskSlice";
import selectTaskReducer from "./features/selectTaskSlice";

export const store = configureStore({
  reducer: {
    dragging: draggingReducer,
    tasklist: taskListReducer,
    editTask: editTaskReducer,
    selectTask: selectTaskReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
