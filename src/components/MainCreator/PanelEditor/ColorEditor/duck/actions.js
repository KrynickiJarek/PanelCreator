import types from './types'

const change = item => ({
  type: types.CHANGE_COLOR, item
})

const setFrontEndReducerColor = item => ({
  type: types.SET_FRONT_END_REDUCER_COLOR, item
})

const resetColor = item => ({
  type: types.RESET_COLOR, item
})

const actions = {
  change,
  setFrontEndReducerColor,
  resetColor
}

export default actions
