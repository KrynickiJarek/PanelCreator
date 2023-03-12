import types from './types'

const changeIconHolders = item => ({
  type: types.CHANGE_ICON_HOLDERS, item
})
const addIconToFavorite = item => ({
  type: types.ADD_ICON_TO_FAVORITE, item
})

const updateOwnIcons = item => ({
  type: types.UPDATE_OWN_ICONS, item
})

const updateFavoriteIcons = item => ({
  type: types.UPDATE_FAVORITE_ICONS, item
})

const removeIconFromFavorite = item => ({
  type: types.REMOVE_ICON_FROM_FAVORITE, item
})
const isAnySelected = item => ({
  type: types.IS_ANY_SELECTED, item
})
const setAreThereAnyIcons = item => ({
  type: types.SET_ARE_THERE_ANY_ICONS, item
})
const setFrontEndReducerIcon = item => ({
  type: types.SET_FRONT_END_REDUCER_ICON, item
})

const updateOwnLogo = item => ({
  type: types.UPDATE_OWN_LOGO, item
})

const setRfidType = item => ({
  type: types.SET_RFID_TYPE, item
})

const setRfidText = item => ({
  type: types.SET_RFID_TEXT, item
})

const setRfidTextFont = item => ({
  type: types.SET_RFID_TEXT_FONT, item
})


const setRfidTextFontWeight = item => ({
  type: types.SET_RFID_TEXT_FONT_WEIGHT, item
})

const setRfidTextFontSize = item => ({
  type: types.SET_RFID_TEXT_FONT_SIZE, item
})



const actions = {
  changeIconHolders,
  addIconToFavorite,
  updateOwnIcons,
  updateFavoriteIcons,
  removeIconFromFavorite,
  isAnySelected,
  setFrontEndReducerIcon,
  setAreThereAnyIcons,
  updateOwnLogo,
  setRfidType,
  setRfidText,
  setRfidTextFont,
  setRfidTextFontWeight,
  setRfidTextFontSize
}

export default actions
