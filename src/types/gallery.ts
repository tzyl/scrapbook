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

export enum GalleryDimensions {
  THUMBNAIL_HEIGHT = 150,
}

export enum PhotoOrientation {
  TOP_LEFT = 1,
  TOP_RIGHT = 2,
  BOTTOM_RIGHT = 3,
  BOTTOM_LEFT = 4,
  LEFT_TOP = 5,
  RIGHT_TOP = 6,
  RIGHT_BOTTOM = 7,
  LEFT_BOTTOM = 8,
}
