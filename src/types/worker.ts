import { IEvent } from "./events";
import { IPhoto, PhotoOrientation } from "./gallery";
import { Dispatch, IAction, IStoreState } from "./redux";

export interface IStoreWorkerState {
  thumbnailRequests: string[];
  orientationRequests: string[];
}

export enum WorkerActionDefinitions {
  REQUEST_THUMBNAILS = "REQUEST_THUMBNAILS",
  RECEIVE_THUMBNAILS = "RECEIVE_THUMBNAILS",
  FINISH_THUMBNAILS = "FINISH_THUMBNAILS",
  REQUEST_ORIENTATIONS = "REQUEST_ORIENTATIONS",
  RECEIVE_ORIENTATIONS = "RECEIVE_ORIENTATIONS",
  FINISH_ORIENTATIONS = "FINISH_ORIENTATIONS",
}

export interface IWorkerAction extends IAction {
  type: WorkerActionDefinitions;
}

export interface IWorker {
  update: (events: IEvent[], requests: string[]) => any;
}

export interface IThumbnailWorker extends IWorker {
  generateThumbnail: (photo: IPhoto, thumbnailHeight: number) => Promise<string>;
}

export interface IOrientationWorker extends IWorker {
  getOrientation: (photo: IPhoto) => Promise<PhotoOrientation>;
}
