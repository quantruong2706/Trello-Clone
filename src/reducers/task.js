import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {},
  columns: {},
  columnOrder: [],
  currTaskIdToEdit: '',
  currColIdToEdit: '',
  isDialogOpen: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setAllTasks: (state, action) => {
      state.tasks += action.payload;
    },
    setAllColumns: (state, action) => {
        state.columns += action.payload;
    },
    setColumnOrder: (state, action) => {
      state.columnOrder += action.payload;
    },
  },
});

export const { setAllTasks, setAllColumns, setColumnOrder } = taskSlice.actions;

export default taskSlice.reducer;
