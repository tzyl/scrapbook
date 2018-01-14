import { IScrapbookEvent } from "../types/events";
import { ITimelineAction, TimelineActionDefinitions } from "../types/timeline";

export const selectEvent = (event: IScrapbookEvent): ITimelineAction => {
  return {
    type: TimelineActionDefinitions.SELECT_EVENT,
    payload: {
      event,
    },
  };
};
