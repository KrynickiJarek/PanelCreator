import types from "./types"


const visualReducer = (state = false, action) => {
  switch (action.type) {
    case types.TOGGLE_VISUAL:
      return action.item
    default:
      return state
  }
}

export default visualReducer