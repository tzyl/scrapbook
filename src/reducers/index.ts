import { combineReducers } from "redux";

import { IStoreState } from "../types/redux";
import editor from "./editor";
import events from "./events";
import gallery from "./gallery";
import timeline from "./timeline";
import worker from "./worker";

const rootReducer = combineReducers<IStoreState>({
  events,
  gallery,
  timeline,
  editor,
  worker,
});

export default rootReducer;
