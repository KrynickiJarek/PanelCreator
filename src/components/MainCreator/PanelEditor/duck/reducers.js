import types from "./types"

const INITIAL_STATE = {
  tab: "model",
  subtab: "default"
}

const tabReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_TAB:
      return { ...state, tab: action.item }
    case types.CHANGE_SUBTAB:
      return { ...state, subtab: action.item }
    default:
      return state
  }
}


export default tabReducer
