import types from "./types"


const INITIAL_STATE = {
  chosenFrameFont: "Calibri-bold",
  chosenFrameShape: "sharp",
  addNewFrame: false, //chyba do skasowania
  addNewFrameFlag: false,
  removeFrame: { type: null, id: null },
  removeFrameList: null, //może nie być intial state?
  overFrame: { type: null, id: null },
  frameList: [],
  frameHolders: [],
  frameHoldersTemp: [],


}

const frameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_FRAME_FONT:
      return {
        ...state, chosenFrameFont: action.item
      }
    case types.CHANGE_FRAME_SHAPE:
      return {
        ...state, chosenFrameShape: action.item
      }
    case types.ADD_NEW_FRAME:
      return {
        ...state, frameHolders: [...state.frameHolders, state.frameHoldersTemp], frameHoldersTemp: [], addNewFrameFlag: action.item
      }
    case types.ADD_NEW_FRAME_FLAG:
      return {
        ...state, addNewFrameFlag: action.item
      }
    case types.REMOVE_FRAME:
      return {
        ...state, removeFrame: action.item
      }
    case types.REMOVE_FRAME_LIST:
      return {
        ...state, frameHolders: [...state.frameHolders.filter(function (element, index) { return index !== action.item })]
      }
    case types.OVER_FRAME:
      return {
        ...state, overFrame: action.item
      }
    case types.FRAME_LIST:
      return {
        ...state, frameList: action.item
      }
    case types.FRAME_HOLDERS:
      return {
        ...state, frameHolders: action.item
      }
    case types.FRAME_HOLDERS_TEMP:
      return {
        ...state, frameHoldersTemp: action.item
      }
    default:
      return state
  }
}

export default frameReducer