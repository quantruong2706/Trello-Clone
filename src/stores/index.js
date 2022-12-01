import { configureStore } from '@reduxjs/toolkit';
import trelloReducer from '@/reducers/trello';
import taskReducer from '@/reducers/task';

export const store = configureStore({
  reducer: {
    trello: trelloReducer,
    task: taskReducer,
  },
});
