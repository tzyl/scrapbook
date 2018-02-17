import { IEvent } from "./events";
import { IAction } from "./redux";

export interface IStoreTimelineState {
  selectedEvent: IEvent;
}

export enum TimelineActionDefinitions {
  SELECT_EVENT = "SELECT_EVENT",
}

export interface ITimelineAction extends IAction {
  type: TimelineActionDefinitions;
}
