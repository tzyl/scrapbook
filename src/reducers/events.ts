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
      return state.map((event) => {
        if (event.id === action.payload.id) {
          const { startIndex, thumbnails } = action.payload;
          const withThumbnails = event.photos.slice(startIndex, startIndex + thumbnails.length).map((photo, index) => {
            return {
              ...photo,
              thumbnail: thumbnails[index],
            };
          });
          return {
            ...event,
            photos: [
              ...event.photos.slice(0, startIndex),
              ...withThumbnails,
              ...event.photos.slice(startIndex + thumbnails.length),
            ],
          };
        }
        return event;
      });
    case WorkerActionDefinitions.RECEIVE_ORIENTATIONS:
      return state.map((event) => {
        if (event.id === action.payload.id) {
          const { startIndex, orientations } = action.payload;
          const withOrientations = event.photos.slice(startIndex, startIndex + orientations.length)
            .map((photo, index) => {
              return {
                ...photo,
                orientation: orientations[index],
              };
            });
          return {
            ...event,
            photos: [
              ...event.photos.slice(0, startIndex),
              ...withOrientations,
              ...event.photos.slice(startIndex + orientations.length),
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
