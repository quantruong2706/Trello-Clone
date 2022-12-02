import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const { VITE_BASE_API_KEY } = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_BASE_API_KEY,
  authDomain: 'trello-clone-1978b.firebaseapp.com',
  databaseURL: 'https://trello-clone-1978b-default-rtdb.firebaseio.com',
  projectId: 'trello-clone-1978b',
  storageBucket: 'trello-clone-1978b.appspot.com',
  messagingSenderId: '484485251473',
  appId: '1:484485251473:web:05428877127c6dda71da30',
  measurementId: 'G-DYS54RKPCB',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
