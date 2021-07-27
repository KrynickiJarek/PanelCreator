import { combineReducers } from "redux";
import colorReducer from "../../components/MainCreator/PanelEditor/ColorEditor/duck"
import tabReducer from "../../components/MainCreator/PanelEditor/duck/reducers";
import modelReducer from "../../components/MainCreator/PanelEditor/ModelChooser/duck";
import frameReducer from "../../components/MainCreator/PanelEditor/FrameEditor/duck";
import iconReducer from "../../components/MainCreator/PanelEditor/IconEditor/duck";
import textReducer from "../../components/MainCreator/PanelEditor/TextEditor/duck";
import visualReducer from "../../components/MainCreator/PanelPreview/duck";


const frontEndDataReducers = combineReducers({
  color: colorReducer,
  tab: tabReducer,
  model: modelReducer,
  frame: frameReducer,
  visual: visualReducer,
  text: textReducer,
  icon: iconReducer
})

export default frontEndDataReducers