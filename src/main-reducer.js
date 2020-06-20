import React from "react";
import { combineReducers } from "redux";
import reducer from "./reducer/reducer";

const combineReducer = combineReducers({
  reducer
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP_STORE") {
    state = undefined;
  }
  return combineReducer(state, action);
};
export default rootReducer;
