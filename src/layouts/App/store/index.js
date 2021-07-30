import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension'; //dodane
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(pReducer);
export const store = createStore(pReducer, composeWithDevTools()); //dodane
export const persistor = persistStore(store);



// import { createStore } from "redux"
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducers from './reducers';

// const store = createStore(rootReducers, composeWithDevTools())

// export default store
