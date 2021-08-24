import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './layouts/App/App';
import reportWebVitals from './reportWebVitals';

import './i18n';

import { Provider } from "react-redux"
import { persistor, store } from "./layouts/App/store/index"
import LoadingView from './layouts/LoadingView/LoadingView';






ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingView />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
