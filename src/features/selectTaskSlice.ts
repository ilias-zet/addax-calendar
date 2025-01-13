import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../types'

export interface SelectTaskState {
  task: Task | null;
}

const initialState: SelectTaskState = {
  task: null,
}

export const selectTaskSlice = createSlice({
  name: 'selectTask',
  initialState,
  reducers: {
    setSelectedTask: (_, action: PayloadAction<SelectTaskState>) => action.payload,
    deselectTask: () => initialState,
  },
})

export const { setSelectedTask, deselectTask } = selectTaskSlice.actions;
export default selectTaskSlice.reducer;
