import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KanbanState, Task } from '../types';

const initialState: KanbanState = {
  tasks: [],
  searchQuery: '',
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      // Prevent duplicate task IDs
      if (!state.tasks.some(task => task.id === action.payload.id)) {
        state.tasks.push(action.payload);
      }
    },
    moveTask: (state, action: PayloadAction<{ taskId: string; newStatus: Task['status'] }>) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.taskId ? { ...task, status: action.payload.newStatus } : task
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addTask, moveTask, setSearchQuery } = kanbanSlice.actions;
export default kanbanSlice.reducer;