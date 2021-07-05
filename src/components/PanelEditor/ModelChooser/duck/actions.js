import types from './types'

const change = item => ({
  type: types.CHANGE_MODEL, item
})

const actions = {
  change
}

export default actions