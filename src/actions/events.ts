import { EventsActionDefinitions, IEvent, IEventsAction } from "../types/events";

export const addEvent = (event: IEvent): IEventsAction => {
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
