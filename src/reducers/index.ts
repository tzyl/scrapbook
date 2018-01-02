import { combineReducers } from "redux";

import { IStoreState } from "../constants/redux";
import timeline from "./timeline";

const rootReducer = combineReducers<IStoreState>({
  timeline,
});

export default rootReducer;
