import { IScrapbookEvent } from "../types/events";
import { ITimelineAction, TimelineActionDefinitions } from "../types/timeline";

export const selectEvent = (event: IScrapbookEvent): ITimelineAction => {
  return {
    payload: {
      event,
    },
    type: TimelineActionDefinitions.SELECT_EVENT,
  };
};
