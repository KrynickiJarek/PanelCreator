import types from "./types"

const INITIAL_STATE = {
  panels: [],
  dashboard: true,
  dashboardEnter: false,
  creator: true,
  indexOfLastPanel: -1
}

const dashboardRaducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_PANEL:
      return {
        ...state, panels: [...state.panels, action.item]
      }
    case types.UPDATE_PANELS:
      return {
        ...state, panels: action.item
      }
    case types.SHOW_DASHBOARD:
      return {
        ...state, dashboard: action.item
      }

    case types.HIDE_CREATOR:
      return {
        ...state, creator: action.item
      }

    case types.DASHBOARD_SMOOTH_ENTER:
      return {
        ...state, dashboardEnter: action.item
      }

    case types.CHANGE_INDEX_OF_LAST_PANEL:
      return {
        ...state, indexOfLastPanel: action.item
      }
    default:
      return state
  }
}

export default dashboardRaducers