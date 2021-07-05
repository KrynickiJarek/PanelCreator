import types from "./types"
import availableModels from "../availableModels"


const modelReducer = (state = availableModels[6], action) => {
  switch (action.type) {
    case types.CHANGE_MODEL:
      return action.item
    default:
      return state
  }
}

export default modelReducer