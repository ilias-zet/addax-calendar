import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../types'

export interface DraggingState {
  task: Task | null;
}

const initialState: DraggingState = {
  task: null,
}

export const draggingSlice = createSlice({
  name: 'dragging',
  initialState,
  reducers: {
    setDragTask: (state, action: PayloadAction<Task | null>) => {
      state.task = action.payload;
    },
  },
})

export const { setDragTask } = draggingSlice.actions;
export default draggingSlice.reducer;
