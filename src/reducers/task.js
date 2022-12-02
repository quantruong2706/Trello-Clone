import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllTasks, fetchAllBoards, fetchBoardOrder } from '@/apis/trello';

const initialState = {
  tasks: {},
  boards: {},
  boardsOrder: [],
  currTaskIdToEdit: '',
  currColIdToEdit: '',
  isDialogOpen: false,
  isLoading: false,
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
