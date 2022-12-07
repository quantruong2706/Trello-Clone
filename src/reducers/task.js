import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: {},
  taskSelected: {},
  boards: {},
  boardsOrder: [],
  isDialogOpen: false
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setAllTasks: (state, action) => {
      state.tasks = { ...state.tasks, ...action.payload }
    },
    setAllBoards: (state, action) => {
      state.boards = { ...state.boards, ...action.payload }
    },
    setBoardOrder: (state, action) => {
      state.boardsOrder = action.payload
    },
    setOpenDialog: (state, action) => {
      state.isDialogOpen = action.payload
    },
    setTaskSelected: (state, action) => {
      state.taskSelected = action.payload
    }
  }
})

export const { setAllTasks, setAllBoards, setBoardOrder, setOpenDialog, setTaskSelected } = taskSlice.actions

export default taskSlice.reducer
