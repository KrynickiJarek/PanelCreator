import types from "./types"

const tabReducer = (state = "model", action) => {
  switch (action.type) {
    case types.CHANGE_TAB:
      return action.item
    default:
      return state
  }
}

export default tabReducer