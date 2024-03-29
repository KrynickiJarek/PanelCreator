import types from './types'

const changePanelName = item => ({
  type: types.CHANGE_PANEL_NAME, item
})

const changePanelType = item => ({
  type: types.CHANGE_PANEL_TYPE, item
})

const changePanelColor = (ral, hex) => ({
  type: types.CHANGE_PANEL_COLOR, ral, hex
})

const resetPanelColor = (ral, hex) => ({
  type: types.RESET_PANEL_COLOR, ral, hex
})

const resetPanelCut = item => ({
  type: types.RESET_PANEL_CUT, item
})

const changePanelCut = item => ({
  type: types.CHANGE_PANEL_CUT, item
})

const changePanelText = item => ({
  type: types.CHANGE_PANEL_TEXT, item
})

const changeIcons = item => ({
  type: types.CHANGE_ICONS, item
})

const changeRfid = item => ({
  type: types.CHANGE_RFID, item
})

const changeFrames = item => ({
  type: types.CHANGE_FRAMES, item
})

const editFrameText = (text, index) => ({
  type: types.EDIT_FRAME_TEXT, text, index
})

const setBackEndReducers = item => ({
  type: types.SET_BACK_END_REDUCER, item
})


const actions = {
  changePanelName,
  changePanelType,
  changePanelColor,
  changePanelCut,
  resetPanelColor,
  resetPanelCut,
  changePanelText,
  changeIcons,
  changeRfid,
  changeFrames,
  editFrameText,
  setBackEndReducers
}

export default actions