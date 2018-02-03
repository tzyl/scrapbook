import { EventsActionDefinitions, IEventsAction, IScrapbookEvent } from "../types/events";

export const addEvent = (event: IScrapbookEvent): IEventsAction => {
  return {
    type: EventsActionDefinitions.ADD_EVENT,
    payload: {
      event,
    },
  };
};

export const removeEvent = (id: string): IEventsAction => {
  return {
    type: EventsActionDefinitions.REMOVE_EVENT,
    payload: {
      id,
    },
  };
};
