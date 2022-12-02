// @ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllTasks } from '@/apis/trello';

const initialState = {
  tasks: {},
  boards: {},
  boardsOrder: [],
  errorMessage: null,
};

export const trelloSlice = createSlice({
  name: 'trello',
  initialState,
  // Các sync action
  // reducers: {
  //   increment: state => {
  //     state.value += 1;
  //   },
  //   decrement: state => {
  //     state.value -= 1;
  //   },
  //   incrementByAmount: (state, action) => {
  //     state.value += action.payload;
  //   },
  // },
  // Các async action
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
  },
});

export const { increment, decrement, incrementByAmount } = trelloSlice.actions;

export default trelloSlice.reducer;
