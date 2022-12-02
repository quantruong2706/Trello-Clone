import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

const { VITE_BASE_API_KEY } = import.meta.env;

const firebaseConfig = {
  apiKey: 'AIzaSyCzF_BTsqQ0_RcF0BUwu5IPk3D1b4Ru2bg',
  authDomain: 'trello-clone-1978b.firebaseapp.com',
  databaseURL: 'https://trello-clone-1978b-default-rtdb.firebaseio.com',
  projectId: 'trello-clone-1978b',
  storageBucket: 'trello-clone-1978b.appspot.com',
  messagingSenderId: '484485251473',
  appId: '1:484485251473:web:05428877127c6dda71da30',
  measurementId: 'G-DYS54RKPCB',
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export default db;
