import { mockEvents } from "../mockData";
import { EventsActionDefinitions, IScrapbookEvent, IStoreEventsState } from "../types/events";
import { IAction } from "../types/redux";
import { WorkerActionDefinitions } from "../types/worker";

const defaultState: IStoreEventsState = mockEvents;

const events = (state = defaultState, action: IAction): IStoreEventsState => {
  switch (action.type) {
    case EventsActionDefinitions.ADD_EVENT:
      return [...state, action.payload.event].sort(compareEvents);
    case EventsActionDefinitions.REMOVE_EVENT:
      return state.filter((event) => event.id !== action.payload.id);
    case WorkerActionDefinitions.UPDATE_THUMBNAILS:
      return state.map((event) => {
        if (event.id === action.payload.id) {
          event.photos = action.payload.photos;
        }
        return event;
      });
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
