import { createAsyncThunk } from '@reduxjs/toolkit'
import { query, getDocs, collection } from 'firebase/firestore'
import db from '@server/firebase'

const fetchAllTasks = createAsyncThunk('trello/fetchAllTasks', async () => {})

const fetchAllBoards = createAsyncThunk('trello/fetchAllBoards', async () => {})

const fetchBoardOrder = createAsyncThunk('trello/fetchBoardOrder', async () => {})

export { fetchAllTasks, fetchAllBoards, fetchBoardOrder }
