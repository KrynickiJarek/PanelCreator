import types from './types'

const changeIconHolders = item => ({
  type: types.CHANGE_ICON_HOLDERS, item
})
const addIconToFavorite = item => ({
  type: types.ADD_ICON_TO_FAVORITE, item
})
const removeIconFromFavorite = item => ({
  type: types.REMOVE_ICON_FROM_FAVORITE, item
})
const isAnySelected = item => ({
  type: types.IS_ANY_SELECTED, item
})


const actions = {
  changeIconHolders,
  addIconToFavorite,
  removeIconFromFavorite,
  isAnySelected,
}

export default actions
