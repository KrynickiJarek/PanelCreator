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
const setFrontEndReducerIcon = item => ({
  type: types.SET_FRONT_END_REDUCER_ICON, item
})




const actions = {
  changeIconHolders,
  addIconToFavorite,
  removeIconFromFavorite,
  isAnySelected,
  setFrontEndReducerIcon
}

export default actions