// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
const { VITE_BASE_API_KEY } = import.meta.env;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: VITE_BASE_API_KEY,
  authDomain: 'trello-clone-1978b.firebaseapp.com',
  projectId: 'trello-clone-1978b',
  storageBucket: 'trello-clone-1978b.appspot.com',
  messagingSenderId: '484485251473',
  appId: '1:484485251473:web:05428877127c6dda71da30',
  measurementId: 'G-DYS54RKPCB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

export { database };
