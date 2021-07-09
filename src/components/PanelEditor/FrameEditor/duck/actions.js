import types from './types'

const changeFrameFont = item => ({
  type: types.CHANGE_FRAME_FONT, item
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

const actions = {
  changeFrameFont,
  changeFrameShape,
  addNewFrame,
  removeFrame,
  overFrame,
  frameHolders,
  frameHoldersTemp,
  changeFrameText,
  changeFramesShapeToSharp,
  changeFramesShapeToRound,
  overFrameReRender

}

export default actions
