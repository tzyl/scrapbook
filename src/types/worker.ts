import { IAction } from "./redux";

export interface IStoreWorkerState {
  requests: string[];
}

export enum WorkerActionDefinitions {
  REQUEST_THUMBNAILS = "REQUEST_THUMBNAILS",
  RECEIVE_THUMBNAILS = "RECEIVE_THUMBNAILS",
}

export interface IWorkerAction extends IAction {
  type: WorkerActionDefinitions;
}
