import types from "./types"
import availableColors from "../availableColors"


const colorReducer = (state = availableColors[0], action) => {
  switch (action.type) {
    case types.CHANGE_COLOR:
      return action.item
    case types.SET_FRONT_END_REDUCER_COLOR:
      return action.item
    case types.RESET_COLOR:
      return availableColors[0]
    default:
      return state
  }
}

export default colorReducer
