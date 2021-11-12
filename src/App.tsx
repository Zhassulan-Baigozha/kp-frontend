import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider  } from '@mui/material/styles';
import Main from './layout/Main';
import { createTheme  } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';
import { primaryColor } from './constants/customTheme';

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
}, ruRU);

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
