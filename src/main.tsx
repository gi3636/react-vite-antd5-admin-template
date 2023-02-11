import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import { Provider } from 'react-redux';
import store from './store/index';
import { HashRouter } from 'react-router-dom';
import Router from '@/route';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Router></Router>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
