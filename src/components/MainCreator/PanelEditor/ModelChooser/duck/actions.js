import types from './types'

const change = item => ({
  type: types.CHANGE_MODEL, item
})

const resetModel = item => ({
  type: types.RESET_MODEL, item
})


const resetAllAfterModelChange = item => ({
  type: types.RESET_ALL_AFTER_MODEL_CHANGE, item
})

const actions = {
  change,
  resetModel,
  resetAllAfterModelChange
}

export default actions