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

const changePanelText = item => ({
  type: types.CHANGE_PANEL_TEXT, item
})

const changeIcons = item => ({
  type: types.CHANGE_ICONS, item
})

const changeFrames = item => ({
  type: types.CHANGE_FRAMES, item
})

const actions = {
  changePanelName,
  changePanelType,
  changePanelColor,
  changePanelText,
  changeIcons,
  changeFrames
}

export default actions