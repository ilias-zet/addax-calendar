import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../types'
import { arrayMove, getTaskInfo } from '../utils';

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
      const from = state[fromCell] = state[fromCell] || [];
      const to = state[toCell] = state[toCell] || [];

      if (from === to) {
        arrayMove<Task>(to, fromIdx, toIdx);
      } else {
        to.splice(toIdx, 0, from[fromIdx]);
        from.splice(fromIdx, 1);
      }
    },
    createOrUpdateTask: (state, { payload: { cellId, task } }: PayloadAction<{ cellId: string, task: Task }>) => {
      const cell = state[cellId] = state[cellId] || [];
      const existedTask = cell.find(t => t.id === task.id);
      if (existedTask) {
        Object.assign(existedTask, task);
      } else {
        cell.push(task);
      }
    },
    deleteTask: (state, { payload: task }: PayloadAction<Task>) => {
      const { idx, cellId } = getTaskInfo(task.id, state);
      if (idx === -1 || !cellId) return;
      state[cellId].splice(idx, 1);
    }
  },
})

export const { setTaskList, moveTask, createOrUpdateTask, deleteTask } = taskListSlice.actions;
export default taskListSlice.reducer;
