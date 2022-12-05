import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {},
  boards: {},
  boardsOrder: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setAllTasks: (state, action) => {
      state.tasks = { ...state.tasks, ...action.payload };
    },
    setAllBoards: (state, action) => {
      state.boards = { ...state.boards, ...action.payload };
    },
    setBoardOrder: (state, action) => {
      state.boardsOrder = [...action.payload];
    },
  },
});

export const { setAllTasks, setAllBoards, setBoardOrder } = taskSlice.actions;

export default taskSlice.reducer;
