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

const addNewFrameFlag = item => ({
  type: types.ADD_NEW_FRAME_FLAG, item
})

const removeFrame = item => ({
  type: types.REMOVE_FRAME, item
})

const removeFrameList = item => ({
  type: types.REMOVE_FRAME_LIST, item
})

const overFrame = item => ({
  type: types.OVER_FRAME, item
})

const frameList = item => ({
  type: types.FRAME_LIST, item
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

const actions = {
  changeFrameFont,
  changeFrameShape,
  addNewFrame,
  addNewFrameFlag,
  removeFrame,
  removeFrameList,
  overFrame,
  frameList,
  frameHolders,
  frameHoldersTemp,
  changeFrameText
}

export default actions
