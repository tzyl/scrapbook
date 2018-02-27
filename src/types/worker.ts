import { IEvent, IPhoto } from "./events";
import { Dispatch, IAction, IStoreState } from "./redux";

export interface IStoreWorkerState {
  requests: string[];
}

export enum WorkerActionDefinitions {
  REQUEST_THUMBNAILS = "REQUEST_THUMBNAILS",
  RECEIVE_THUMBNAILS = "RECEIVE_THUMBNAILS",
  FINISH_THUMBNAILS = "FINISH_THUMBNAILS",
}

export interface IWorkerAction extends IAction {
  type: WorkerActionDefinitions;
}

export interface IWorker {
  update: (events: IEvent[], requests: string[]) => any;
}

export interface IThumbnailWorker extends IWorker {
  generateThumbnail: (photo: IPhoto, thumbnailHeight: number) => Promise<IPhoto>;
}
