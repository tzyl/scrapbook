import { EventsActionsDefinitions, IEventsAction, IScrapbookEvent } from "../types/events";

export const addEvent = (event: IScrapbookEvent): IEventsAction => {
  return {
    type: EventsActionsDefinitions.ADD_EVENT,
    payload: {
      event,
    },
  };
};

export const removeEvent = (id: string): IEventsAction => {
  return {
    type: EventsActionsDefinitions.REMOVE_EVENT,
    payload: {
      id,
    },
  };
};
