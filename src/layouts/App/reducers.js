import { combineReducers } from "redux";
// import actorReducer from "./actors/duck"
// import moviesReducer from "./movies/duck"
import colorReducer from "../../components/PanelEditor/ColorEditor/duck"
import tabReducer from "../../components/PanelEditor/duck/reducers";
import modelReducer from "../../components/PanelEditor/ModelChooser/duck";
import frameReducer from "../../components/PanelEditor/FrameEditor/duck";

const rootReducers = combineReducers({
  // actors: actorReducer,
  // movies: moviesReducer,
  color: colorReducer,
  tab: tabReducer,
  model: modelReducer,
  frame: frameReducer
})

export default rootReducers