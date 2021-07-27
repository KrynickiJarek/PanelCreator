import types from './types'

const changeTextFont = item => ({
  type: types.CHANGE_TEXT_FONT, item
})

const textReRender = item => ({
  type: types.TEXT_RE_RENDER, item
})
const setFrontEndReducerText = item => ({
  type: types.SET_FRONT_END_REDUCER_TEXT, item
})

const actions = {
  changeTextFont,
  textReRender,
  setFrontEndReducerText
}





export default actions
