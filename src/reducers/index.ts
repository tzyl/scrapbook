import { combineReducers } from "redux";

import { IStoreState } from "../types/redux";
import gallery from "./gallery";
import timeline from "./timeline";

const rootReducer = combineReducers<IStoreState>({
  gallery,
  timeline,
});

export default rootReducer;
