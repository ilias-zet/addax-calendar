import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../types'

interface MoveTaskPayload {
  fromCell: string;
  toCell: string;
  fromIdx: number;
  toIdx: number;
}

export type TaskList = Record<string, Task[]>;

const initialState: TaskList = {};

export const taskListSlice = createSlice({
  name: 'tasklist',
  initialState,
  reducers: {
    setTaskList: (_, { payload }: PayloadAction<TaskList>) => payload,
    moveTask: (state, { payload: { fromCell, toCell, fromIdx, toIdx } }: PayloadAction<MoveTaskPayload>) => {
      state[fromCell] = state[fromCell] || [];
      state[toCell] = state[toCell] || [];
      state[toCell].splice(toIdx, 0, state[fromCell][fromIdx]);
      state[fromCell].splice(fromIdx, 1);
    }
  },
})

export const { setTaskList, moveTask } = taskListSlice.actions;
export default taskListSlice.reducer;
