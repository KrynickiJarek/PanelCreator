import types from './types'


const addPanel = item => ({
  type: types.ADD_PANEL, item
})

const updatePanels = item => ({
  type: types.UPDATE_PANELS, item
})


const showDashboard = item => ({
  type: types.SHOW_DASHBOARD, item
})

const dashboardSmoothEnter = item => ({
  type: types.DASHBOARD_SMOOTH_ENTER, item
})

const hideCreator = item => ({
  type: types.HIDE_CREATOR, item
})

const changeIndexOfLastPanel = item => ({
  type: types.CHANGE_INDEX_OF_LAST_PANEL, item
})

const actions = {
  addPanel,
  updatePanels,
  showDashboard,
  dashboardSmoothEnter,
  hideCreator,
  changeIndexOfLastPanel
}

export default actions