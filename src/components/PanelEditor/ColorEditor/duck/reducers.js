import types from "./types"
import availableColors from "../availableColors"


const colorReducer = (state = availableColors[0], action) => {
  switch (action.type) {
    case types.CHANGE_COLOR:
      return action.item
    default:
      return state
  }
}

export default colorReducer

// import types from "./types"
// import availableColors from "../availableColors"

// const INITIAL_STATE = {
//   color: availableColors[0]
// }

// const colorReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case types.CHANGE_COLOR:
//       return {
//         color: action.item
//       }
//     case types.RESET_COLOR:
//       return {
//         color: availableColors[0]
//       }
//     default:
//       return state
//   }
// }

// export default colorReducer