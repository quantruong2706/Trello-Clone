import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/reducers/counter';
import taskReducer from '@/reducers/task';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
  },
});
