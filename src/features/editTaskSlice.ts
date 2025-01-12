import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../types'
import { generateId } from '../utils';

export interface EditTaskState {
  task: Task | null;
  cellId: string;
  editMode: boolean;
}

const initialState: EditTaskState = {
  task: null,
  cellId: '',
  editMode: true,
}

export const editTaskSlice = createSlice({
  name: 'editTask',
  initialState,
  reducers: {
    createNewTask: (_, { payload: { cellId } }: PayloadAction<{ cellId: string }>) => ({
      cellId,
      task: {
        id: generateId(),
        title: '',
        description: '',
      },
      editMode: false,
    }),
    editTask: (_, { payload: { cellId, task } }: PayloadAction<{ cellId: string, task: Task }>) => ({
      task,
      cellId,
      editMode: true,
    }),
    closeEditor: (state) => ({ ...state, task: null, cellId: '' }),
  },
})

export const { createNewTask, editTask, closeEditor } = editTaskSlice.actions;
export default editTaskSlice.reducer;
