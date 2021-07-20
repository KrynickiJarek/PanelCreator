import types from './types'

const toggleVisual = item => ({
  type: types.TOGGLE_VISUAL, item
})

const changeScale = item => ({
  type: types.CHANGE_SCALE, item
})

const toggleAnimations = item => ({
  type: types.TOGGLE_ANIMATIONS, item
})

const showRemoveIcon = item => ({
  type: types.SHOW_REMOVE_ICON, item
})

const showRemoveIcons = item => ({
  type: types.SHOW_REMOVE_ICONS, item
})

const changePanelName = item => ({
  type: types.CHANGE_PANEL_NAME, item
})

const actions = {
  toggleVisual,
  changeScale,
  toggleAnimations,
  showRemoveIcon,
  showRemoveIcons,
  changePanelName
}

export default actions