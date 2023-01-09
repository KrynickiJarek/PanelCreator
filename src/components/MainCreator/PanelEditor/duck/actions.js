import types from './types'

const change = item => ({
  type: types.CHANGE_TAB, item
})

const changeSubtab = item => ({
  type: types.CHANGE_SUBTAB, item
})

const actions = {
  change,
  changeSubtab
}

export default actions
