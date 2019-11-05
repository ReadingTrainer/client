import { combineReducers } from "redux";
import authentication from "./authentication";
import history from "./history";
import texts from "./texts";

const appReducer = combineReducers({
  authentication,
  texts,
  history
});

const rootReducer = (state, action) => {
  //clears state on logout
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
