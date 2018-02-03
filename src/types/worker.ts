import { IAction } from "./redux";

import { IScrapbookPhoto } from "./events";

export interface IStoreWorkerState {
  requests: string[];
}

export enum WorkerActionDefinitions {
  REQUEST_THUMBNAILS = "REQUEST_THUMBNAILS",
  UPDATE_THUMBNAILS = "UPDATE_THUMBNAILS",
}

export interface IWorkerAction extends IAction {
  type: WorkerActionDefinitions;
}

export interface IThumbnailRequestResponse {
  id: string;
  photos: IScrapbookPhoto[];
}
