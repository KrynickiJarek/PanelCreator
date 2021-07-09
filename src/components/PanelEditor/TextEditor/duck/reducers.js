import types from "./types"


const INITIAL_STATE = {
  chosenTextFont: "Calibri-bold",
}

const textReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_TEXT_FONT:
      return {
        ...state, chosenTextFont: action.item
      }
    default:
      return state
  }
}

export default textReducer