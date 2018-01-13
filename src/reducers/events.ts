import { mockEvents } from "../mockData";
import { EventsActionsDefinitions, IScrapbookEvent, IStoreEventsState } from "../types/events";
import { IAction } from "../types/redux";

const defaultState: IStoreEventsState = mockEvents;

const events = (state = defaultState, action: IAction): IStoreEventsState => {
  switch (action.type) {
    case EventsActionsDefinitions.ADD_EVENT:
      return [...state, action.payload.event].sort(compareEvents);
    case EventsActionsDefinitions.REMOVE_EVENT:
      return state.filter((event) => event.id !== action.payload.id);
    default:
      return state;
  }
};

const compareEvents = (a: IScrapbookEvent, b: IScrapbookEvent) => {
  if (a.createdAt < b.createdAt) {
    return -1;
  }
  if (b.createdAt < a.createdAt) {
    return 1;
  }
  return 0;
};

export default events;
