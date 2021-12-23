import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import React from 'react';
import { Button } from 'antd';
import { Provider } from 'react-redux';
import store from './store';
import Main from './layout/Main';
import { primaryColor } from './constants';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
      <Button style={{ 
        backgroundColor: primaryColor, 
        color: '#fff',
        borderRadius: '8px',
        height: '40px',
        fontWeight: '500',
      }}>
        Войти
      </Button>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
