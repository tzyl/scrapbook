import ThumbnailWorker = require("worker-loader!../util/ThumbnailWorker");
import { IScrapbookPhoto } from "../types/events";
import { Dispatch } from "../types/redux";
import { IThumbnailRequestResponse, IWorkerAction, WorkerActionDefinitions } from "../types/worker";

export const requestThumbnails = (id: string, photos: IScrapbookPhoto[]) => (dispatch: Dispatch) => {
  const request: IThumbnailRequestResponse = {
    id,
    photos,
  };
  dispatch(createThumbnailRequest(request));
  const worker = new ThumbnailWorker();
  console.log(worker);
  worker.onmessage = (event: MessageEvent) => {
    console.log(event);
    dispatch(updateThumbnails(event.data));
    worker.terminate();
  };
  worker.postMessage(request);
};

export const updateThumbnails = (response: IThumbnailRequestResponse): IWorkerAction => {
  return {
    type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
    payload: {
      response,
    },
  };
};

export const createThumbnailRequest = (request: IThumbnailRequestResponse) => {
  return {
    type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
    payload: {
      request,
    },
  };
};