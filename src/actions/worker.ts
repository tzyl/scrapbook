import { IPhoto } from "../types/gallery";
import { IWorkerAction, WorkerActionDefinitions } from "../types/worker";

export const requestThumbnails = (id: string) => {
  return {
    type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
    payload: {
      id,
    },
  };
};

export const receiveThumbnails = (id: string, photos: IPhoto[], startIndex = 0): IWorkerAction => {
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
