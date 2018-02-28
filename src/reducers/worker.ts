import { IAction } from "../types/redux";
import { IStoreWorkerState, WorkerActionDefinitions } from "../types/worker";

export const defaultState: IStoreWorkerState = {
  requests: [],
};

const worker = (state = defaultState, action: IAction): IStoreWorkerState => {
  switch (action.type) {
    case WorkerActionDefinitions.REQUEST_THUMBNAILS:
      return {
        ...state,
        requests: [...state.requests, action.payload.id],
      };
    case WorkerActionDefinitions.FINISH_THUMBNAILS:
      return {
        ...state,
        requests: state.requests.filter((id) => id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default worker;
