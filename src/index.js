import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import ReactDOM from 'react-dom';
import './index.scss';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './layouts/App/App';
import reportWebVitals from './reportWebVitals';

import './i18n';

import { Provider } from "react-redux"
import { persistor, store } from "./layouts/App/store/index"
import LoadingView from './layouts/LoadingView/LoadingView';


Sentry.init({
  dsn: "https://745995017c4e437cb5327afd9cf2c60a@o977255.ingest.sentry.io/5933737",
  integrations: [new Integrations.BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});



ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingView />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();


