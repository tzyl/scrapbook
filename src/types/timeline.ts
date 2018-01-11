import { IScrapbookEvent } from "./events";
import { IAction } from "./redux";

export interface IStoreTimelineState {
  selectedEvent: IScrapbookEvent;
}

export enum TimelineActionDefinitions {
  SELECT_EVENT = "SELECT_EVENT",
}

export interface ITimelineAction extends IAction {
  type: TimelineActionDefinitions;
}
