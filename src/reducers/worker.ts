import { IAction } from "../types/redux";
import { IStoreWorkerState, WorkerActionDefinitions } from "../types/worker";

export const defaultState: IStoreWorkerState = {
  thumbnailRequests: [],
  orientationRequests: [],
};

const worker = (state = defaultState, action: IAction): IStoreWorkerState => {
  switch (action.type) {
    case WorkerActionDefinitions.REQUEST_THUMBNAILS:
      return {
        ...state,
        thumbnailRequests: [...state.thumbnailRequests, action.payload.id],
      };
    case WorkerActionDefinitions.FINISH_THUMBNAILS:
      return {
        ...state,
        thumbnailRequests: state.thumbnailRequests.filter((id) => id !== action.payload.id),
      };
    case WorkerActionDefinitions.REQUEST_ORIENTATION:
      return {
        ...state,
        orientationRequests: [...state.orientationRequests, action.payload.id],
      };
    case WorkerActionDefinitions.FINISH_ORIENTATION:
      return {
        ...state,
        orientationRequests: state.orientationRequests.filter((id) => id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default worker;
