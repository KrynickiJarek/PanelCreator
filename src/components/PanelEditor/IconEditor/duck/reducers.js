import types from "./types"


const INITIAL_STATE = {
  iconHolders: [],
  favoriteIcons: [],
  favoriteIconsRender: false,
}

const iconReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_ICON_HOLDERS:
      return {
        ...state, iconHolders: action.item
      }
    case types.ADD_ICON_TO_FAVORITE:
      const copyFavoriteIcons = state.favoriteIcons;
      if (copyFavoriteIcons.indexOf(action.item) === -1) {
        copyFavoriteIcons.push(action.item)
      }
      else {
        copyFavoriteIcons.splice((copyFavoriteIcons.indexOf(action.item)), 1)
      }
      return {
        ...state, favoriteIcons: copyFavoriteIcons, favoriteIconsRender: !state.favoriteIconsRender
      }
    case types.REMOVE_ICON_FROM_FAVORITE:
      // const tempArr = state.favoriteIcons
      // tempArr.splice((tempArr.indexOf(action.item)), 1)
      return {
        // ...state, favoriteIcons: tempArr
        ...state, favoriteIcons: [...state.favoriteIcons.filter(function (element) { return element !== action.item })], favoriteIconsChange: !state.favoriteIconsChange
      }
    // case types.ADD_NEW_FRAME:
    //   const newFrameHolders = state.frameHolders
    //   const newFrame = state.frameHoldersTemp
    //   if (newFrame) {
    //     if (newFrame.type === "multi") {
    //       newFrame.framePrint.shape = state.chosenFrameShape
    //       newFrame.frameInfo.shape = state.chosenFrameShape
    //       newFrame.framePrint.over = false
    //       newFrame.framePrint.text = state.changeFrameText
    //       if (state.changeFrameText !== "") {
    //         newFrame.framePrint.frameFont = state.chosenFrameFont
    //       } else {
    //         newFrame.framePrint.frameFont = null
    //       }
    //     } else if (newFrame.type === "single") {
    //       newFrame.frameInfo.shape = state.chosenFrameShape
    //       newFrame.framePrint.forEach(el => {
    //         if (el !== 0) {
    //           el.shape = state.chosenFrameShape
    //           el.over = false
    //         }
    //       })
    //     }
    //     newFrameHolders.push(newFrame)
    //   }
    //   return {
    //     ...state, frameHolders: [...newFrameHolders], frameHoldersTemp: null, addNewFrame: action.item
    //   }
    // case types.REMOVE_FRAME:
    //   return {
    //     ...state, frameHolders: [...state.frameHolders.filter(function (element, index) { return index !== action.item })], removeFrame: !state.removeFrame
    //   }
    // case types.OVER_FRAME:
    //   const copyFrameHolders = state.frameHolders;
    //   copyFrameHolders.forEach((element, index) => {
    //     if (index === action.item.index) {
    //       if (element.type === "single") {
    //         element.framePrint.forEach(singleElement => {
    //           if (singleElement !== 0) {
    //             singleElement.over = action.item.flag
    //           }
    //         })
    //       } else if (element.type === "multi") {
    //         element.framePrint.over = action.item.flag
    //       }
    //     }
    //   })
    //   return {
    //     ...state, frameHolders: copyFrameHolders, overFrame: !state.overFrame
    //   }
    // case types.FRAME_HOLDERS:
    //   return {
    //     ...state, frameHolders: action.item
    //   }
    // case types.FRAME_HOLDERS_TEMP:
    //   return {
    //     ...state, frameHoldersTemp: action.item
    //   }
    // case types.CHANGE_FRAME_TEXT:
    //   return {
    //     ...state, changeFrameText: action.item
    //   }
    // case types.CHANGE_FRAMES_SHAPE_TO_SHARP:
    //   const copyFrameHoldersForShapeChangeToSharp = state.frameHolders
    //   copyFrameHoldersForShapeChangeToSharp.forEach(element => {
    //     if (element.type === "multi") {
    //       element.framePrint.shape = "sharp"
    //       element.frameInfo.shape = "sharp"
    //     } else if (element.type === "single") {
    //       element.frameInfo.shape = "sharp"
    //       element.framePrint.forEach(singleElement => {
    //         if (singleElement !== 0) {
    //           singleElement.shape = "sharp"
    //         }
    //       })
    //     }
    //   })
    //   return {
    //     ...state, frameHolders: copyFrameHoldersForShapeChangeToSharp
    //   }
    // case types.CHANGE_FRAMES_SHAPE_TO_ROUND:
    //   const copyFrameHoldersForShapeChangeToRound = state.frameHolders
    //   copyFrameHoldersForShapeChangeToRound.forEach(element => {
    //     if (element.type === "multi") {
    //       element.framePrint.shape = "round"
    //       element.frameInfo.shape = "round"
    //     } else if (element.type === "single") {
    //       element.frameInfo.shape = "round"
    //       element.framePrint.forEach(singleElement => {
    //         if (singleElement !== 0) {
    //           singleElement.shape = "round"
    //         }
    //       })
    //     }
    //   })
    //   return {
    //     ...state, frameHolders: copyFrameHoldersForShapeChangeToRound
    //   }
    default:
      return state
  }
}

export default iconReducer