import { IThumbnailRequestResponse, IWorkerAction, WorkerActionDefinitions } from "../types/worker";

export const requestThumbnails = (request: IThumbnailRequestResponse): IWorkerAction => {
  return {
    type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
    payload: {
      request,
    },
  };
};

export const updateThumbnails = (response: IThumbnailRequestResponse): IWorkerAction => {
  return {
    type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
    payload: {
      response,
    },
  };
};
