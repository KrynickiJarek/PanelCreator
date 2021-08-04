import types from "./types"

const INITIAL_STATE = {
  visual: false,
  scale: 5,
  animations: true,
  removeIcon: false,
  removeIcons: false,
  panelName: "",
  timeOfCreation: null,
  version: "0.96",
  warnings: [],
  warningsReRender: false
}

const visualReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.TOGGLE_VISUAL:
      return {
        ...state, visual: action.item
      }
    case types.CHANGE_SCALE:
      return {
        ...state, scale: action.item
      }
    case types.TOGGLE_ANIMATIONS:
      return {
        ...state, animations: action.item
      }
    case types.SHOW_REMOVE_ICON:
      return {
        ...state, removeIcon: action.item
      }
    case types.SHOW_REMOVE_ICONS:
      return {
        ...state, removeIcons: action.item
      }
    case types.CHANGE_PANEL_NAME:
      return {
        ...state, panelName: action.item
      }
    case types.SET_TIME_OF_CREATION:
      return {
        ...state, timeOfCreation: action.item
      }
    case types.UPDATE_WARNINGS:
      return {
        ...state, warnings: action.item, warningsReRender: !state.warningsReRender
      }
    case types.FILTER_WARNINGS:
      return {
        ...state, warnings: state.warnings.filter(element => element.code !== action.item), warningsReRender: !state.warningsReRender
      }
    case types.PUSH_WARNINGS:
      return {
        ...state, warnings: [...state.warnings, { code: action.item, show: true, hide: false }], warningsReRender: !state.warningsReRender
      }
    case types.UPDATE_VERSION:
      return {
        ...state, version: action.item
      }
    case types.SET_FRONT_END_REDUCER_VISUAL:
      return action.item
    default:
      return state
  }
}

export default visualReducer