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

const changeIndexOfLastPanel = item => ({
  type: types.CHANGE_INDEX_OF_LAST_PANEL, item
})

const actions = {
  addPanel,
  updatePanels,
  showDashboard,
  changeIndexOfLastPanel
}

export default actions