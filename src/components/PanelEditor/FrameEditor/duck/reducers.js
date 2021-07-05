import types from "./types"


const INITIAL_STATE = {
  chosenFrameFont: "Calibri-bold",
  chosenFrameShape: "sharp",
  addNewFrame: false, //chyba do skasowania
  addNewFrameFlag: false,
  removeFrame: { type: null, id: null },
  removeFrameList: null, //może nie być intial state?
  overFrame: false,
  frameList: [],
  frameHolders: [],
  frameHoldersTemp: [],
  changeFrameText: ""



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

      // const newFrame = state.frameHoldersTemp
      // newFrame.framePrint.shape = state.chosenFrameShape
      // newFrame.framePrint.over = false
      // newFrame.framePrint.text = state.changeFrameText
      // if (state.changeFrameText !== "") {
      //   newFrame.framePrint.frameFont = state.chosenFrameFont
      // } else {
      //   newFrame.framePrint.frameFont = null
      // }

      const newFrameHolders = state.frameHolders
      const newFrame = state.frameHoldersTemp
      if (newFrame.length !== 0) {
        newFrame.framePrint.shape = state.chosenFrameShape
        newFrame.framePrint.over = false
        newFrame.framePrint.text = state.changeFrameText
        if (state.changeFrameText !== "") {
          newFrame.framePrint.frameFont = state.chosenFrameFont
        } else {
          newFrame.framePrint.frameFont = null
        }
        newFrameHolders.push(newFrame)
      }
      return {
        // ...state, frameHolders: [...state.frameHolders, newFrame], frameHoldersTemp: [], addNewFrameFlag: action.item
        ...state, frameHolders: [...newFrameHolders], frameHoldersTemp: [], addNewFrameFlag: action.item
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
      const copyFrameHolders = state.frameHolders;
      copyFrameHolders.forEach((element, index) => {
        if (index === action.item.index) {
          if (element.type === "single") {
            element.framePrint.forEach(singleElement => {
              if (singleElement !== 0) {
                singleElement.over = action.item.flag
              }
            })
          } else if (element.type === "multi") {
            element.framePrint.over = action.item.flag
          }
        }
      })
      return {
        ...state, frameHolders: copyFrameHolders, overFrame: !state.overFrame
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
    case types.CHANGE_FRAME_TEXT:
      return {
        ...state, changeFrameText: action.item
      }
    default:
      return state
  }
}

export default frameReducer