import types from "./types"
import availableColors from "../PanelEditor/ColorEditor/availableColors"
import availableModels from "../PanelEditor/ModelChooser/availableModels"



const INITIAL_STATE = {
  panelName: "",
  panelType: availableModels[0].backEndPanelType,
  panelColorRal: availableColors[0].RAL,
  panelColorHex: availableColors[0].hex,
  icons: [],
  panelText: [],
  frames: []
}

const backEndDataReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_PANEL_NAME:
      return {
        ...state, panelName: action.item
      }
    case types.CHANGE_PANEL_TYPE:
      return {
        ...state, panelType: action.item
      }
    case types.CHANGE_PANEL_COLOR:
      return {
        ...state, panelColorRal: action.ral, panelColorHex: action.hex
      }
    case types.CHANGE_PANEL_TEXT:
      return {
        ...state, panelText: action.item
      }
    case types.CHANGE_ICONS:
      return {
        ...state, icons: action.item
      }
    case types.CHANGE_FRAMES:
      return {
        ...state, frames: action.item
      }
    default:
      return state
  }
}

export default backEndDataReducers