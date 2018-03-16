import { mockEvents } from "../mockData";
import { EventsActionDefinitions, IEvent, IStoreEventsState } from "../types/events";
import { IAction } from "../types/redux";
import { WorkerActionDefinitions } from "../types/worker";

export const defaultState: IStoreEventsState = mockEvents;

const events = (state = defaultState, action: IAction): IStoreEventsState => {
  switch (action.type) {
    case EventsActionDefinitions.ADD_EVENT:
      return [...state, action.payload.event].sort(compareEvents);
    case EventsActionDefinitions.REMOVE_EVENT:
      return state.filter((event) => event.id !== action.payload.id);
    case WorkerActionDefinitions.RECEIVE_THUMBNAILS:
    case WorkerActionDefinitions.RECEIVE_ORIENTATION:
      return state.map((event) => {
        if (event.id === action.payload.id) {
          return {
            ...event,
            photos: [
              ...event.photos.slice(0, action.payload.startIndex),
              ...action.payload.photos,
              ...event.photos.slice(action.payload.startIndex + action.payload.photos.length),
            ],
          };
        }
        return event;
      });
    default:
      return state;
  }
};

const compareEvents = (a: IEvent, b: IEvent) => {
  if (a.createdAt < b.createdAt) {
    return -1;
  }
  if (b.createdAt < a.createdAt) {
    return 1;
  }
  return 0;
};

export default events;
