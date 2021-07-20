import types from "./types"


const INITIAL_STATE = {
  chosenFrameFont: "Calibri-bold",
  chosenFrameShape: "sharp",
  addNewFrame: false,
  removeFrame: false,
  overFrameRender: false,
  frameHolders: [],
  frameHoldersTemp: null,
  frameText: "",
  frameTitleFlag: false,
  allowFrameTitleFlag: false,
  lastRemovedFrameIndex: null
}

const frameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_FRAME_FONT:
      return {
        ...state, chosenFrameFont: action.item, overFrameRender: !state.overFrameRender
      }
    case types.CHANGE_FRAME_SHAPE:
      return {
        ...state, chosenFrameShape: action.item
      }
    case types.ADD_NEW_FRAME:
      const newFrameHolders = state.frameHolders
      const newFrame = state.frameHoldersTemp
      if (newFrame) {
        if (newFrame.type === "multi") {
          newFrame.framePrint.shape = state.chosenFrameShape
          newFrame.frameInfo.shape = state.chosenFrameShape
          newFrame.framePrint.over = false
          newFrame.framePrint.text = state.frameText
          if (state.frameText !== "") {
            newFrame.framePrint.frameFont = state.chosenFrameFont
          } else {
            newFrame.framePrint.frameFont = null
          }
        } else if (newFrame.type === "single") {
          newFrame.frameInfo.shape = state.chosenFrameShape
          newFrame.framePrint.forEach(el => {
            if (el !== 0) {
              el.shape = state.chosenFrameShape
              el.over = false
            }
          })
        }
        newFrameHolders.push(newFrame)
      }
      return {
        ...state, frameHolders: [...newFrameHolders], frameHoldersTemp: null, addNewFrame: action.item
      }
    case types.REMOVE_FRAME:
      return {
        ...state, frameHolders: [...state.frameHolders.filter(function (element, index) { return index !== action.item })],
        removeFrame: !state.removeFrame,
        lastRemovedFrameIndex: action.item
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
        ...state, frameHolders: copyFrameHolders, overFrameRender: !state.overFrameRender
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
        ...state, frameText: action.item
      }
    case types.CHANGE_FRAMES_SHAPE_TO_SHARP:
      const copyFrameHoldersForShapeChangeToSharp = state.frameHolders
      copyFrameHoldersForShapeChangeToSharp.forEach(element => {
        if (element.type === "multi") {
          element.framePrint.shape = "sharp"
          element.frameInfo.shape = "sharp"
        } else if (element.type === "single") {
          element.frameInfo.shape = "sharp"
          element.framePrint.forEach(singleElement => {
            if (singleElement !== 0) {
              singleElement.shape = "sharp"
            }
          })
        }
      })
      return {
        ...state, frameHolders: copyFrameHoldersForShapeChangeToSharp
      }
    case types.CHANGE_FRAMES_SHAPE_TO_ROUND:
      const copyFrameHoldersForShapeChangeToRound = state.frameHolders
      copyFrameHoldersForShapeChangeToRound.forEach(element => {
        if (element.type === "multi") {
          element.framePrint.shape = "round"
          element.frameInfo.shape = "round"
        } else if (element.type === "single") {
          element.frameInfo.shape = "round"
          element.framePrint.forEach(singleElement => {
            if (singleElement !== 0) {
              singleElement.shape = "round"
            }
          })
        }
      })
      return {
        ...state, frameHolders: copyFrameHoldersForShapeChangeToRound
      }
    case types.OVER_FRAME_RE_RENDER:
      return {
        ...state, overFrameRender: !state.overFrameRender
      }
    case types.FRAME_TITLE:
      return {
        ...state, frameTitleFlag: action.item
      }
    case types.ALLOW_FRAME_TITLE:
      return {
        ...state, allowFrameTitleFlag: action.item
      }
    default:
      return state
  }
}

export default frameReducer