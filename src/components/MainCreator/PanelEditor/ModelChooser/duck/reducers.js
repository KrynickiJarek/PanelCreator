import types from "./types"
import availableModels from "../availableModels"

const INITIAL_STATE = {
  chosenModel: availableModels[0],
  resetAllAfterModelChangeFlag: true
}

const modelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_MODEL:
      return {
        ...state, chosenModel: action.item
      }
    case types.RESET_MODEL:
      return {
        ...state, chosenModel: availableModels[0]
      }
    case types.RESET_ALL_AFTER_MODEL_CHANGE:
      return {
        ...state, resetAllAfterModelChangeFlag: action.item
      }
    default:
      return state
  }
}

export default modelReducer

