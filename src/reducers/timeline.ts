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
        const { startIndex, thumbnails } = action.payload;
        const { photos } = state.selectedEvent;
        const withThumbnails = photos.slice(startIndex, startIndex + thumbnails.length).map((photo, index) => {
          return {
            ...photo,
            thumbnail: thumbnails[index],
          };
        });
        return {
          selectedEvent: {
            ...state.selectedEvent,
            photos: [
              ...photos.slice(0, startIndex),
              ...withThumbnails,
              ...photos.slice(startIndex + thumbnails.length),
            ],
          },
        };
      }
      return state;
    case WorkerActionDefinitions.RECEIVE_ORIENTATIONS:
      if (state.selectedEvent && state.selectedEvent.id === action.payload.id) {
        const { startIndex, orientations } = action.payload;
        const { photos } = state.selectedEvent;
        const withOrientations = photos.slice(startIndex, startIndex + orientations.length).map((photo, index) => {
          return {
            ...photo,
            orientation: orientations[index],
          };
        });
        return {
          selectedEvent: {
            ...state.selectedEvent,
            photos: [
              ...photos.slice(0, startIndex),
              ...withOrientations,
              ...photos.slice(startIndex + orientations.length),
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
