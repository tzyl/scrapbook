import { IPhoto } from "../types/events";
import { Dispatch } from "../types/redux";
import { IWorkerAction, WorkerActionDefinitions } from "../types/worker";
import generateThumbnails from "../util/thumbnail";

export const requestThumbnails = (id: string) => {
  return {
    type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
    payload: {
      id,
    },
  };
};

export const receiveThumbnails = (id: string, photos: IPhoto[], startIndex: number): IWorkerAction => {
  return {
    type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
    payload: {
      id,
      photos,
      startIndex,
    },
  };
};

export const finishThumbnails = (id: string): IWorkerAction => {
  return {
    type: WorkerActionDefinitions.FINISH_THUMBNAILS,
    payload: {
      id,
    },
  };
};
