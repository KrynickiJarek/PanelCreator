import types from './types'

const change = item => ({
  type: types.CHANGE_COLOR, item
})

const actions = {
  change
}

export default actions
