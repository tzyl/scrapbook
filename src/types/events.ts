import { ILightboxPhoto } from "react-images";
import { IPhotoProps } from "react-photo-gallery";
import { IAction } from "./redux";

export interface IStoreEventsState extends Array<IScrapbookEvent> {}

export interface IScrapbookEvent {
  id: string;
  title: string;
  createdAt: string;
  subtitle?: string;
  description?: string;
  photos: IScrapbookPhoto[];
}

export type IScrapbookPhoto = IPhotoProps & ILightboxPhoto;

export enum EventsActionDefinitions {
  ADD_EVENT = "ADD_EVENT",
  REMOVE_EVENT = "REMOVE_EVENT",
}

export interface IEventsAction extends IAction {
  type: EventsActionDefinitions;
}
