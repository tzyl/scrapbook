import { IAction } from "../types/redux";
import { IStoreWorkerState, WorkerActionDefinitions } from "../types/worker";

const defaultState: IStoreWorkerState = {
  requests: [],
};

const worker = (state = defaultState, action: IAction): IStoreWorkerState => {
  switch (action.type) {
    case WorkerActionDefinitions.REQUEST_THUMBNAILS:
      return {
        ...state,
        requests: [...state.requests, action.payload.request.id],
      };
    case WorkerActionDefinitions.UPDATE_THUMBNAILS:
      return {
        ...state,
        requests: state.requests.filter((id) => id !== action.payload.request.id),
      };
    default:
      return state;
  }
};

export default worker;
