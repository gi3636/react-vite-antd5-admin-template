import React from 'react';
import './i18n.ts';
import ReactDOM from 'react-dom/client';
import './index.less';
import { Provider } from 'react-redux';
import store from './store/index';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
