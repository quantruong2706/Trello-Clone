import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDocs, collection } from 'firebase/firestore';
import db from '@server/firebase';

const fetchAllTasks = createAsyncThunk('trello/fetchAllTasks', async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  console.log(querySnapshot);
});

const fetchAllBoards = createAsyncThunk(
  'trello/fetchAllBoards',
  async () => {},
);

const fetchBoardOrder = createAsyncThunk(
  'trello/fetchBoardOrder',
  async () => {},
);

export { fetchAllTasks, fetchAllBoards, fetchBoardOrder };
