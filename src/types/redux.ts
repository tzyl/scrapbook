import { Dispatch } from "redux";

import { IStoreGalleryState } from "./gallery";
import { IStoreTimelineState } from "./timeline";

export interface IStoreState {
  timeline: IStoreTimelineState;
  gallery: IStoreGalleryState;
}

export interface IAction {
  readonly type: string;
  readonly payload?: any;
}

export type Dispatch = Dispatch<IStoreState>;
