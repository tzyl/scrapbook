import { combineReducers } from "redux";

import { IStoreState } from "../types/redux";
import events from "./events";
import gallery from "./gallery";
import timeline from "./timeline";

const rootReducer = combineReducers<IStoreState>({
  events,
  gallery,
  timeline,
});

export default rootReducer;
