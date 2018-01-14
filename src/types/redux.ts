import { Dispatch } from "redux";

import { IStoreEditorState } from "./editor";
import { IStoreEventsState } from "./events";
import { IStoreGalleryState } from "./gallery";
import { IStoreTimelineState } from "./timeline";

export interface IStoreState {
  events: IStoreEventsState;
  timeline: IStoreTimelineState;
  gallery: IStoreGalleryState;
  editor: IStoreEditorState;
}

export interface IAction {
  readonly type: string;
  readonly payload?: any;
}

export type Dispatch = Dispatch<IStoreState>;
