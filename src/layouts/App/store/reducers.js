import { combineReducers } from "redux";
import frontEndDataReducers from "../frontEndDataReducers";
import backEndDataReducers from "../../../components/MainCreator/duck";
import dashboardRaducers from "../../../components/Dashboard/duck";


const rootReducers = combineReducers({
  frontEndData: frontEndDataReducers,
  backEndData: backEndDataReducers,
  panels: dashboardRaducers
})

export default rootReducers

