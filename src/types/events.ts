import { ILightboxPhoto } from "react-images";
import { IPhotoProps } from "react-photo-gallery";
import { IAction } from "./redux";

export interface IStoreEventsState extends Array<IScrapbookEvent> {}

export interface IScrapbookEvent {
  title: string;
  subtitle?: string;
  description?: React.ReactNode;
  createdAt: string;
  photos: IScrapbookPhoto[];
  id: string;
}

export type IScrapbookPhoto = IPhotoProps & ILightboxPhoto;

export enum EventsActionsDefinitions {
  ADD_EVENT = "ADD_EVENT",
  REMOVE_EVENT = "REMOVE_EVENT",
}

export interface IEventsAction extends IAction {
  type: EventsActionsDefinitions;
}
