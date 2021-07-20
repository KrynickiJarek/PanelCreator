import { combineReducers } from "redux";
import colorReducer from "../../components/PanelEditor/ColorEditor/duck"
import tabReducer from "../../components/PanelEditor/duck/reducers";
import modelReducer from "../../components/PanelEditor/ModelChooser/duck";
import frameReducer from "../../components/PanelEditor/FrameEditor/duck";
import iconReducer from "../../components/PanelEditor/IconEditor/duck";
import textReducer from "../../components/PanelEditor/TextEditor/duck";
import visualReducer from "../../components/PanelPreview/duck";

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



// frontEndData: {
//   color: colorReducer,
//   tab: tabReducer,
//   model: modelReducer,
//   frame: frameReducer,
//   visual: visualReducer,
//   text: textReducer,
//   icon: iconReducer
// }



// import { combineReducers } from "redux";
// import colorReducer from "../../components/PanelEditor/ColorEditor/duck"
// import tabReducer from "../../components/PanelEditor/duck/reducers";
// import modelReducer from "../../components/PanelEditor/ModelChooser/duck";
// import frameReducer from "../../components/PanelEditor/FrameEditor/duck";
// import iconReducer from "../../components/PanelEditor/IconEditor/duck";
// import textReducer from "../../components/PanelEditor/TextEditor/duck";
// import visualReducer from "../../components/PanelPreview/duck";

// const rootReducers = combineReducers({

//   color: colorReducer,
//   tab: tabReducer,
//   model: modelReducer,
//   frame: frameReducer,
//   visual: visualReducer,
//   text: textReducer,
//   icon: iconReducer
// })

// export default rootReducers