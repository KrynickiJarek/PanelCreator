import types from './types'

const changeColor = item => ({
  type: types.CHANGE_COLOR, item
})

const changeCut = item => ({
  type: types.CHANGE_CUT, item
})

const setFrontEndReducerColor = item => ({
  type: types.SET_FRONT_END_REDUCER_COLOR, item
})

const resetColor = item => ({
  type: types.RESET_COLOR, item
})

const resetCut = item => ({
  type: types.RESET_CUT, item
})

const actions = {
  changeColor,
  changeCut,
  setFrontEndReducerColor,
  resetColor,
  resetCut
}

export default actions
