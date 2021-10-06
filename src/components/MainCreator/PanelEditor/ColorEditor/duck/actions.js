import types from './types'

const changeColor = item => ({
  type: types.CHANGE_COLOR, item
})

const changeRounding = item => ({
  type: types.CHANGE_ROUNDING, item
})

const setFrontEndReducerColor = item => ({
  type: types.SET_FRONT_END_REDUCER_COLOR, item
})

const resetColor = item => ({
  type: types.RESET_COLOR, item
})

const actions = {
  changeColor,
  changeRounding,
  setFrontEndReducerColor,
  resetColor
}

export default actions
