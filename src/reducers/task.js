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
  extraReducers: builder => {
    builder.addCase(fetchAllTasks.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = { ...action.payload };
    });
    builder.addCase(fetchAllTasks.rejected, (state, action) => {
      state.isLoading = false;
    });
    // board
    builder.addCase(fetchAllBoards.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllBoards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boards = { ...action.payload };
    });
    builder.addCase(fetchAllBoards.rejected, (state, action) => {
      state.isLoading = false;
    });
    // boardOrder
    builder.addCase(fetchBoardOrder.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boardsOrder = { ...action.payload };
    });
    builder.addCase(fetchBoardOrder.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { setAllTasks, setAllBoards, setBoardOrder } = taskSlice.actions;

export default taskSlice.reducer;
