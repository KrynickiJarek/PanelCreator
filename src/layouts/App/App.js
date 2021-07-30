import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import './App.scss';

import { persistor, store } from './store';
import Dashboard from "../../components/Dashboard/Dashboard"
// import { RootComponent, LoadingView } from './components'; /// DODAJ WIDOK ŁADOWANIA

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={<LoadingView />} persistor={persistor}> */}
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Dashboard />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
