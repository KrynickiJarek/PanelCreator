import types from './types'

const changeFrameFont = item => ({
  type: types.CHANGE_FRAME_FONT, item
})


const changeFrameFontWeight = item => ({
  type: types.CHANGE_FRAME_FONT_WEIGHT, item
})

const changeFrameFontInfo = item => ({
  type: types.CHANGE_FRAME_FONT_INFO, item
})
const changeFrameShape = item => ({
  type: types.CHANGE_FRAME_SHAPE, item
})

const addNewFrame = item => ({
  type: types.ADD_NEW_FRAME, item
})

const removeFrame = item => ({
  type: types.REMOVE_FRAME, item
})

const overFrame = item => ({
  type: types.OVER_FRAME, item
})

const overFrameAll = item => ({
  type: types.OVER_FRAME_ALL, item
})

const frameHolders = item => ({
  type: types.FRAME_HOLDERS, item
})

const frameHoldersTemp = item => ({
  type: types.FRAME_HOLDERS_TEMP, item
})

const changeFrameText = item => ({
  type: types.CHANGE_FRAME_TEXT, item
})

const changeFramesShapeToSharp = item => ({
  type: types.CHANGE_FRAMES_SHAPE_TO_SHARP, item
})

const changeFramesShapeToRound = item => ({
  type: types.CHANGE_FRAMES_SHAPE_TO_ROUND, item
})

const overFrameReRender = item => ({
  type: types.OVER_FRAME_RE_RENDER, item
})

const frameTitle = item => ({
  type: types.FRAME_TITLE, item
})

const allowFrameTitle = item => ({
  type: types.ALLOW_FRAME_TITLE, item
})

const setFrontEndReducerFrame = item => ({
  type: types.SET_FRONT_END_REDUCER_FRAME, item
})


const actions = {
  changeFrameFont,
  changeFrameFontWeight,
  changeFrameFontInfo,
  changeFrameShape,
  addNewFrame,
  removeFrame,
  overFrame,
  overFrameAll,
  frameHolders,
  frameHoldersTemp,
  changeFrameText,
  changeFramesShapeToSharp,
  changeFramesShapeToRound,
  overFrameReRender,
  frameTitle,
  allowFrameTitle,
  setFrontEndReducerFrame
}

export default actions