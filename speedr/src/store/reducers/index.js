import { combineReducers } from "redux";
import authentication from "./authentication";
import texts from "./texts";

const appReducer = combineReducers({
  authentication,
  texts
});

const rootReducer = (state, action) => {
  //clears state on logout
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
