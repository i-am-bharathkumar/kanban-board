import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './kanbanSlice';

export const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Ready for expansion
});

// Type definitions for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;