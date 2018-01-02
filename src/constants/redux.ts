import { Dispatch } from "redux";

import { IStoreTimelineState } from "./timeline";

export interface IStoreState {
  timeline: IStoreTimelineState;
}

export interface IAction {
  readonly type: string;
  readonly payload?: any;
}

export type Dispatch = Dispatch<IStoreState>;
