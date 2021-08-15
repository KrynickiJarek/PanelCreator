import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './layouts/App/App';
import reportWebVitals from './reportWebVitals';

import './i18n';

import { Provider } from "react-redux" //ma okalać komponent App, czy też React.StrictMode???
import { store } from "./layouts/App/store/index"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
