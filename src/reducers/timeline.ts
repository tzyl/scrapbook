import { IAction } from "../types/redux";
import { IStoreTimelineState, TimelineActionDefinitions } from "../types/timeline";
import { WorkerActionDefinitions } from "../types/worker";

export const defaultState: IStoreTimelineState = {
  selectedEvent: null,
};

const timeline = (state = defaultState, action: IAction): IStoreTimelineState => {
  switch (action.type) {
    case TimelineActionDefinitions.SELECT_EVENT:
      return {
        selectedEvent: action.payload.event,
      };
    case WorkerActionDefinitions.RECEIVE_THUMBNAILS:
      if (state.selectedEvent && state.selectedEvent.id === action.payload.id) {
        return {
          selectedEvent: {
            ...state.selectedEvent,
            photos: [
              ...state.selectedEvent.photos.slice(0, action.payload.startIndex),
              ...action.payload.photos,
              ...state.selectedEvent.photos.slice(action.payload.startIndex + action.payload.photos.length),
            ],
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export default timeline;
