import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './layouts/App/App';
import reportWebVitals from './reportWebVitals';

import './i18n';

import { Provider } from "react-redux"
import { store } from "./layouts/App/store/index"
import LoadingView from './layouts/LoadingView/LoadingView';

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<LoadingView />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
