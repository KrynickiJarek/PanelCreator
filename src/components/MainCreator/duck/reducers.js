import types from "./types"
import availableColors from "../PanelEditor/ColorEditor/availableColors"
import availableModels from "../PanelEditor/ModelChooser/availableModels"



const INITIAL_STATE = {
  panelName: "",
  panelType: availableModels[0].backEndPanelType,
  panelColorRal: availableColors[0].RAL,
  panelColorHex: availableColors[0].hex,
  panelCut: 0,
  icons: [],
  skippedStatusIconsBackEnd: [],
  panelText: [],
  frames: [],
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
    case types.CHANGE_PANEL_CUT:
      return {
        ...state, panelCut: action.item,
      }
    case types.RESET_PANEL_COLOR:
      return {
        ...state, panelColorRal: availableColors[0].RAL, panelColorHex: availableColors[0].hex
      }
    case types.RESET_PANEL_CUT:
      return {
        ...state, panelCut: 0,
      }
    case types.CHANGE_PANEL_TEXT:
      return {
        ...state, panelText: action.item
      }
    case types.CHANGE_ICONS:
      return {
        ...state, icons: action.item
      }
    case types.CHANGE_SKIPPED_STATUS_ICONS:
      return {
        ...state, skippedStatusIconsBackEnd: action.item
      }
    case types.CHANGE_FRAMES:
      return {
        ...state, frames: action.item
      }
    case types.EDIT_FRAME_TEXT:
      const editedFramed = state.frames
      editedFramed.find((el, i) => i === action.index).title = action.text
      return {
        ...state, frames: [...editedFramed]
      }
    case types.SET_BACK_END_REDUCER:
      return action.item
    default:
      return state
  }
}

export default backEndDataReducers