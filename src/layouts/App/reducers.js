import { combineReducers } from "redux";
import frontEndDataReducers from "./frontEndDataReducers";
import backEndDataReducers from "../../components/duck";

const rootReducers = combineReducers({
  frontEndData: frontEndDataReducers,
  backEndData: backEndDataReducers,
})

export default rootReducers

