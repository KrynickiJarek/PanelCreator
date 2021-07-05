import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './layouts/App/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux" //ma okalać komponent App, czy też React.StrictMode???
import store from "./layouts/App/store"

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
