import types from './types'

const changeTextFont = item => ({
  type: types.CHANGE_TEXT_FONT, item
})

const textReRender = item => ({
  type: types.TEXT_RE_RENDER, item
})

const actions = {
  changeTextFont,
  textReRender
}





export default actions
