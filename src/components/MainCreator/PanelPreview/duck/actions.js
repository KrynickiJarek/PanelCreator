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

const updateWarnings = item => ({
  type: types.UPDATE_WARNINGS, item
})

const filterWarnings = item => ({
  type: types.FILTER_WARNINGS, item
})

const pushWarnings = item => ({
  type: types.PUSH_WARNINGS, item
})

const updateVersion = item => ({
  type: types.UPDATE_VERSION, item
})

const showAlert = item => ({
  type: types.SHOW_ALERT, item
})

const removeAlert = item => ({
  type: types.REMOVE_ALERT, item
})

const setAlertAnswer = item => ({
  type: types.SET_ALERT_ANSWER, item
})

const changeLanguage = item => ({
  type: types.CHANGE_LANGUAGE, item
})

const setFullScreen = item => ({
  type: types.SET_FULL_SCREEN, item
})

const actions = {
  toggleVisual,
  changeScale,
  toggleAnimations,
  showRemoveIcon,
  showRemoveIcons,
  changePanelName,
  setTimeOfCreation,
  setFrontEndReducerVisual,
  updateWarnings,
  pushWarnings,
  updateVersion,
  filterWarnings,
  showAlert,
  removeAlert,
  setAlertAnswer,
  changeLanguage,
  setFullScreen
}

export default actions