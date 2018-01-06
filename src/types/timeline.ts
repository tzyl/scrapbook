import { ITimelineEvent } from "../components/ScrapbookTimeline";

export interface IStoreTimelineState {
  events: ITimelineEvent[];
  selectedIndex: number;
}
