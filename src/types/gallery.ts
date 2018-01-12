import { IAction } from "./redux";

export interface IStoreGalleryState {
  galleryIsOpen: boolean;
  lightboxIsOpen: boolean;
  selectedPhotoIndex: number;
}

export enum GalleryActionDefinitions {
  OPEN_GALLERY = "OPEN_GALLERY",
  CLOSE_GALLERY = "CLOSE_GALLERY",
  OPEN_LIGHTBOX = "OPEN_LIGHTBOX",
  CLOSE_LIGHTBOX = "CLOSE_LIGHTBOX",
  SELECT_PREVIOUS_PHOTO = "SELECT_PREVIOUS_PHOTO",
  SELECT_NEXT_PHOTO = "SELECT_NEXT_PHOTO",
  SELECT_PHOTO = "SELECT_PHOTO",
}

export interface IGalleryAction extends IAction {
  type: GalleryActionDefinitions;
}
