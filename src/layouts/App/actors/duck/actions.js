import types from "./types"

const add = item => ({
  type: types.ADD_ACTORS, item
})

const reset = item => ({
  type: types.RESET_ACTORS, item
})

export default {
  add,
  reset
}