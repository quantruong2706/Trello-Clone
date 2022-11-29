import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@/stores/index';
import router from '@/router/Routers';
import { GlobalStyles } from '@/styles/GlobalStyles';

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
}

export default App;
