import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import dataPageReducer from "./dataPageReducer";
import dataDetailReducer from "./dataDetailReducer";

export default combineReducers({
  usersData: dataReducer,
  dataPage: dataPageReducer,
  userData: dataDetailReducer,
});
