import { IPhoto, PhotoOrientation } from "../types/gallery";
import { IWorkerAction, WorkerActionDefinitions } from "../types/worker";

export const requestThumbnails = (id: string) => {
  return {
    type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
    payload: {
      id,
    },
  };
};

export const receiveThumbnails = (id: string, thumbnails: string[], startIndex = 0): IWorkerAction => {
  return {
    type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
    payload: {
      id,
      thumbnails,
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

export const requestOrientations = (id: string) => {
  return {
    type: WorkerActionDefinitions.REQUEST_ORIENTATIONS,
    payload: {
      id,
    },
  };
};

export const receiveOrientations = (id: string, orientations: PhotoOrientation[], startIndex = 0): IWorkerAction => {
  return {
    type: WorkerActionDefinitions.RECEIVE_ORIENTATIONS,
    payload: {
      id,
      orientations,
      startIndex,
    },
  };
};

export const finishOrientations = (id: string): IWorkerAction => {
  return {
    type: WorkerActionDefinitions.FINISH_ORIENTATIONS,
    payload: {
      id,
    },
  };
};
