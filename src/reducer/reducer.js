import React from "react";
import { trackList } from "../mock/TrackerList";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_DATA":
      return {
        timestamp:action.timestamp,
        data: action.payload
      };
    case "EDIT_DATA":
        return {
        data: action.payload
        };
    case "SAVE_DATA":
        return {
        timestamp:action.timestamp,
        data: action.payload
        };
    default:
      return {
          data:{}
      };
  }
}

export default reducer;
