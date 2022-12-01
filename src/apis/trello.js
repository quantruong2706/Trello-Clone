import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, child, get } from 'firebase/database';
import { database } from '@server/firebase';

const dbRef = ref(database);

const fetchAllTasks = createAsyncThunk('trello/fetchAllTasks', async () => {
  const res = await get(child(dbRef, `tasks`));
  return res.val();
});

const fetchAllBoards = createAsyncThunk('trello/fetchAllBoards', async () => {
  const res = await get(child(dbRef, `boards`));
  return res.val();
});

const fetchBoardOrder = createAsyncThunk('trello/fetchBoardOrder', async () => {
  const res = await get(child(dbRef, `boardOrder`));
  return res.val();
});

export { fetchAllTasks, fetchAllBoards, fetchBoardOrder };
