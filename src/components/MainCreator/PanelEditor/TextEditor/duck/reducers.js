import types from "./types"


const INITIAL_STATE = {
  chosenTextFont: "Calibri-bold",
  textRender: false,
}

const textReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_TEXT_FONT:
      return {
        // ...state, chosenTextFont: action.item, textRender: !state.textRender
        chosenTextFont: action.item, textRender: !state.textRender
      }
    case types.TEXT_RE_RENDER:
      return {
        ...state, textRender: !state.textRender
      }
    case types.SET_FRONT_END_REDUCER_TEXT:
      return {
        state: action.item
      }
    default:
      return state
  }
}

export default textReducer