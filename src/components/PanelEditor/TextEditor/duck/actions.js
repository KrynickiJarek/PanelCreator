import types from './types'

const changeTextFont = item => ({
  type: types.CHANGE_TEXT_FONT, item
})

const actions = {
  changeTextFont,
}

export default actions
