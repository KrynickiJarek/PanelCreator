import types from "./types"


const INITIAL_STATE = {
  chosenTextFont: "Calibri-bold",
  chosenTextWeight: "700",
  textRender: false,
  textUpOff: false
}

const textReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_TEXT_FONT:
      return {
        ...state, chosenTextFont: action.item, textRender: !state.textRender
      }
    case types.CHANGE_TEXT_WEIGHT:
      return {
        ...state, chosenTextWeight: action.item, textRender: !state.textRender
      }
    case types.TEXT_RE_RENDER:
      return {
        ...state, textRender: !state.textRender
      }
    case types.TOGGLE_TEXT_UP:
      return {
        ...state, textUpOff: !state.textUpOff
      }
    case types.SET_FRONT_END_REDUCER_TEXT:
      return action.item
    default:
      return state
  }
}

export default textReducer