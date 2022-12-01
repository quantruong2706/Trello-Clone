import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@/stores/index';
import router from '@/router/Routers';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { getDatabase, ref, child, get } from 'firebase/database';
import { database } from '@server/firebase';

function App() {
  const dbRef = ref(database)
  get(child(dbRef, `boards`))
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
  return (
    <>
      <Provider store={store}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
