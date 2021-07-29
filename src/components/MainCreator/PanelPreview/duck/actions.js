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

const setTimeOfCreation = item => ({
  type: types.SET_TIME_OF_CREATION, item
})

const setFrontEndReducerVisual = item => ({
  type: types.SET_FRONT_END_REDUCER_VISUAL, item
})

const actions = {
  toggleVisual,
  changeScale,
  toggleAnimations,
  showRemoveIcon,
  showRemoveIcons,
  changePanelName,
  setTimeOfCreation,
  setFrontEndReducerVisual
}

export default actions