import { IAction } from "./redux";

export interface IStoreTimelineState {
  selectedEventIndex: number;
}

export enum TimelineActionDefinitions {
  SELECT_EVENT = "SELECT_EVENT",
}

export interface ITimelineAction extends IAction {
  type: TimelineActionDefinitions;
}
