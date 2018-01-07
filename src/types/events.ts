import { ILightboxPhoto } from "react-images";
import { IPhotoProps } from "react-photo-gallery";

export interface IStoreEventsState extends Array<IScrapbookEvent> {}

export interface IScrapbookEvent {
  title: string;
  subtitle?: string;
  description?: string;
  createdAt: string;
  photos: IScrapbookPhoto[];
}

export type IScrapbookPhoto = IPhotoProps & ILightboxPhoto;
