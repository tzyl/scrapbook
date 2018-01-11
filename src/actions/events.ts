import { EventsActionsDefinitions, IEventsAction, IScrapbookEvent } from "../types/events";

export const addEvent = (event: IScrapbookEvent): IEventsAction => {
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
