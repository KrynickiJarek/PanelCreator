import types from './types'

const change = item => ({
  type: types.CHANGE_TAB, item
})

const actions = {
  change
}

export default actions
