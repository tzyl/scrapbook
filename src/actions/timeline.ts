import { IEvent } from "../types/events";
import { ITimelineAction, TimelineActionDefinitions } from "../types/timeline";

export const selectEvent = (event: IEvent): ITimelineAction => {
  return {
    type: TimelineActionDefinitions.SELECT_EVENT,
    payload: {
      event,
    },
  };
};
