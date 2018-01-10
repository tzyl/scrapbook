import { IAction } from "./redux";

export interface IStoreGalleryState {
  galleryIsOpen: boolean;
  lightboxIsOpen: boolean;
  selectedPhotoIndex: number;
}

export enum GalleryActionDefinitions {
  TOGGLE_GALLERY_OPEN = "TOGGLE_GALLERY_OPEN",
  TOGGLE_LIGHTBOX_OPEN = "TOGGLE_LIGHTBOX_OPEN",
  SELECT_PHOTO = "SELECT_PHOTO",
}

export interface IGalleryAction extends IAction {
  type: GalleryActionDefinitions;
}
