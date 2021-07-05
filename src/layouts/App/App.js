import React from 'react';
import './App.scss';
import MainCreator from "../../components/MainCreator"
// import MoviesContainer from "./movies/components/MoviesContainer"
// import MoviesForm from "./movies/components/MoviesForm"

function App() {
  return (
    <div className="App">
      <MainCreator />
      {/* <MoviesContainer /> */}
      {/* <MoviesForm /> */}
    </div>
  );
}

export default App;


// import { createStore, combineReducers, bindActionCreators } from "redux"
// import { composeWithDevTools } from 'redux-devtools-extension';

// const initialMovies = {
//   listName: "Favourite",
//   list: [
//     "kiler", "chłopaki nie płaczą", 'job'
//   ]
// }

// const initialActors = {
//   listName: "Best",
//   list: [
//     "Cezary Pazura", "Tom Hanks", "Tom Hardy"
//   ]
// }

// function movies(state = initialMovies, action) {
//   switch (action.type) {
//     case "ADD_MOVIE":
//       return {
//         ...state, list: [...state.list, action.item]
//       }
//     case "RESET_MOVIES":
//       return {
//         ...state, list: []
//       }
//     default:
//       return state
//   }
// }

// function actors(state = initialActors, action) {
//   switch (action.type) {
//     case "ADD_ACTOR":
//       return {
//         ...state, list: [...state.list, action.item]
//       }
//     case "RESET_ACTORS":
//       return {
//         ...state, list: []
//       }
//     default:
//       return state
//   }
// }

// const allReducers = combineReducers({ movies, actors })

// const store = createStore(allReducers, composeWithDevTools())
// window.store = store

// store.dispatch({ type: "ADD_ACTOR", item: "Jarek" })

// const addActor = item => ({ type: "ADD_ACTOR", item })
// const reset = () => ({ type: "RESET_ACTORS" })
// store.dispatch(addActor("Natalcia"))

// const actorsActions = bindActionCreators({ add: addActor, reset }, store.dispatch)

// actorsActions.add("Tomek")
// actorsActions.reset()

