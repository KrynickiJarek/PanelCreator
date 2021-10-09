import types from "./types"
import availableColors from "../availableColors"

const INITIAL_STATE = {
  color: availableColors[0],
  cut: 0,
}

const colorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_COLOR:
      return {
        ...state, color: action.item
      }

    case types.CHANGE_CUT:
      return {
        ...state, cut: action.item
      }

    case types.RESET_COLOR:
      return {
        ...state, color: availableColors[0],
      }

    case types.RESET_CUT:
      return {
        ...state, cut: 0,
      }

    case types.SET_FRONT_END_REDUCER_COLOR:
      return action.item

    default:
      return state
  }
}

export default colorReducer
