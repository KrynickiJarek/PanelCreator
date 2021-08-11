import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import './App.scss';

import {
  BrowserView,
  MobileView,
} from "react-device-detect";

import { persistor, store } from './store';
import Dashboard from "../../components/Dashboard/Dashboard"
import MobileComponent from "../../components/MobileComponent/MobileComponent"
// import { RootComponent, LoadingView } from './components'; /// DODAJ WIDOK ŁADOWANIA



const App = () => {
  return (
    <>
      <BrowserView>
        <Provider store={store}>
          {/* <PersistGate loading={<LoadingView />} persistor={persistor}> */}
          <PersistGate loading={null} persistor={persistor}>
            <div className="App">
              <Dashboard />
            </div>
          </PersistGate>
        </Provider>
      </BrowserView>
      <MobileView>
        <MobileComponent />
      </MobileView>
    </>
  );
};

export default App;


