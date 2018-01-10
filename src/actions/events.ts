import { ITimelineEvent } from "../components/ScrapbookTimeline";
import { EventsActionsDefinitions, IEventsAction } from "../types/events";

export const addEvent = (event: ITimelineEvent): IEventsAction => {
  return {
    payload: {
      event,
    },
    type: EventsActionsDefinitions.ADD_EVENT,
  };
};

export const removeEvent = (id: string): IEventsAction => {
  return {
    payload: {
      id,
    },
    type: EventsActionsDefinitions.REMOVE_EVENT,
  };
};
