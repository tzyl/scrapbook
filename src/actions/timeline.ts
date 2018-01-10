import { ITimelineAction, TimelineActionDefinitions } from "../types/timeline";

export const selectEvent = (index: number): ITimelineAction => {
  return {
    payload: {
      index,
    },
    type: TimelineActionDefinitions.SELECT_EVENT,
  };
};
