import { IAction } from "../types/redux";
import { IStoreTimelineState, TimelineActionDefinitions } from "../types/timeline";
import { WorkerActionDefinitions } from "../types/worker";

const defaultState: IStoreTimelineState = {
  selectedEvent: null,
};

const timeline = (state = defaultState, action: IAction): IStoreTimelineState => {
  switch (action.type) {
    case TimelineActionDefinitions.SELECT_EVENT:
      return {
        ...state,
        selectedEvent: action.payload.event,
      };
    case WorkerActionDefinitions.RECEIVE_THUMBNAILS:
      if (state.selectedEvent && state.selectedEvent.id === action.payload.id) {
        return {
          ...state,
          selectedEvent: {
            ...state.selectedEvent,
            photos: action.payload.photos,
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export default timeline;
