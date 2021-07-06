import { combineReducers } from "redux";
import colorReducer from "../../components/PanelEditor/ColorEditor/duck"
import tabReducer from "../../components/PanelEditor/duck/reducers";
import modelReducer from "../../components/PanelEditor/ModelChooser/duck";
import frameReducer from "../../components/PanelEditor/FrameEditor/duck";
import visualReducer from "../../components/PanelPreview/duck";

const rootReducers = combineReducers({
  color: colorReducer,
  tab: tabReducer,
  model: modelReducer,
  frame: frameReducer,
  visual: visualReducer
})

export default rootReducers