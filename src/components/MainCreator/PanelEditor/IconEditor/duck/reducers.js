import types from "./types"


const INITIAL_STATE = {
  iconHolders: [],
  iconHoldersRender: false,
  favoriteIcons: [],
  favoriteIconsRender: false,
  ownIcons: [],
  ownIconsRender: false,
  isAnySelected: false,
  areThereAnyIcons: false,
  ownLogo: null,
  rfidType: 0,
  rfidText: '',
  rfidTextFont: null,
  rfidTextFontWeight: '',
  rfidTextFontSize: 5
}

const iconReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_ICON_HOLDERS:
      return {
        ...state, iconHolders: action.item, iconHoldersRender: !state.iconHoldersRender
      }
    case types.ADD_ICON_TO_FAVORITE:
      const copyFavoriteIcons = state.favoriteIcons;
      if (copyFavoriteIcons.indexOf(action.item) === -1) {
        copyFavoriteIcons.push(action.item)
      }
      else {
        copyFavoriteIcons.splice((copyFavoriteIcons.indexOf(action.item)), 1)
      }
      return {
        ...state, favoriteIcons: copyFavoriteIcons, favoriteIconsRender: !state.favoriteIconsRender
      }
    case types.REMOVE_ICON_FROM_FAVORITE:
      return {
        ...state, favoriteIcons: [...state.favoriteIcons.filter(function (element) { return element !== action.item })], favoriteIconsChange: !state.favoriteIconsChange
      }
    case types.UPDATE_FAVORITE_ICONS:
      return {
        ...state, favoriteIcons: action.item, favoriteIconsChange: !state.favoriteIconsChange
      }
    case types.UPDATE_OWN_ICONS:
      return {
        ...state, ownIcons: action.item, ownIconsRender: !state.ownIconsRender
      }
    case types.IS_ANY_SELECTED:
      return {
        ...state, isAnySelected: action.item
      }
    case types.SET_ARE_THERE_ANY_ICONS:
      return {
        ...state, areThereAnyIcons: action.item
      }
    case types.SET_FRONT_END_REDUCER_ICON:
      return action.item


    case types.UPDATE_OWN_LOGO:
      return {
        ...state, ownLogo: action.item, ownIconsRender: !state.ownIconsRender
      }

    case types.SET_RFID_TYPE:
      return {
        ...state, rfidType: action.item
      }

    case types.SET_RFID_TEXT:
      return {
        ...state, rfidText: action.item
      }


    case types.SET_RFID_TEXT_FONT:
      return {
        ...state, rfidTextFont: action.item
      }


    case types.SET_RFID_TEXT_FONT_WEIGHT:
      return {
        ...state, rfidTextFontWeight: action.item
      }

    case types.SET_RFID_TEXT_FONT_SIZE:
      return {
        ...state, rfidTextFontSize: (action.item > 2 && action.item <= 10) ? action.item : state.rfidTextFontSize
      }

    default:
      return state
  }
}

export default iconReducer