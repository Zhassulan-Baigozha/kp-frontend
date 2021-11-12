import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider  } from '@mui/material/styles';
import { theme } from './constants/customTheme';
import Main from './layout/Main';

const App: React.FC = () => (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Main />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

export default App;
