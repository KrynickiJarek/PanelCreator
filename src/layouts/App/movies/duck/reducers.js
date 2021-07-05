import types from "./types"

const INITIAL_STATE = {
  listName: "Favourite",
  list: [
    "kiler", "chłopaki nie płaczą", 'job'
  ]
}

const moviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_MOVIE:
      return {
        ...state, list: [...state.list, action.item]
      }
    case types.RESET_MOVIES:
      return {
        ...state, list: []
      }
    default:
      return state
  }
}

export default moviesReducer