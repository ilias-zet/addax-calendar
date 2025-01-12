import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../types'

interface DragTask {
  task: Task;
  cellId: string;
  idx: number;
}
export interface DraggingState {
  taskData: DragTask | null;
  overCell: string | null;
  toIndex: number;
}

const initialState: DraggingState = {
  taskData: null,
  overCell: null,
  toIndex: 0,
}

export const draggingSlice = createSlice({
  name: 'dragging',
  initialState,
  reducers: {
    setDragTask: (state, action: PayloadAction<DragTask | null>) => {
      state.taskData = action.payload;
    },
    setDragOverCell: (state, action: PayloadAction<string | null>) => {
      state.overCell = action.payload;
    },
    setDragToIndex: (state, action: PayloadAction<number>) => {
      state.toIndex = action.payload;
    },
  },
})

export const { setDragTask, setDragOverCell, setDragToIndex } = draggingSlice.actions;
export default draggingSlice.reducer;
