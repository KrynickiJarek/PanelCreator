import types from './types'

const toggleVisual = item => ({
  type: types.TOGGLE_VISUAL, item
})

const actions = {
  toggleVisual
}

export default actions