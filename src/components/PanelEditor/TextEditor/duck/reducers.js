import types from "./types"


const INITIAL_STATE = {
  chosenTextFont: "Calibri-bold",
  textRender: false
}

const textReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_TEXT_FONT:
      return {
        ...state, chosenTextFont: action.item, textRender: !state.textRender
      }
    case types.TEXT_RE_RENDER: //a komu to potrzebne
      return {
        ...state, textRender: !state.textRender
      }
    default:
      return state
  }
}

export default textReducer