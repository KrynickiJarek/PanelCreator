import types from "./types"

const INITIAL_STATE = {
  visual: false,
  scale: 5,
  animations: true,
  removeIcon: false,
  removeIcons: false,
  panelName: "",
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
    default:
      return state
  }
}

export default visualReducer