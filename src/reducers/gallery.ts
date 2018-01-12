import { GalleryActionDefinitions, IStoreGalleryState } from "../types/gallery";
import { IAction } from "../types/redux";

const defaultState: IStoreGalleryState = {
  galleryIsOpen: false,
  lightboxIsOpen: false,
  selectedPhotoIndex: 0,
};

const gallery = (state = defaultState, action: IAction): IStoreGalleryState => {
  switch (action.type) {
    case GalleryActionDefinitions.OPEN_GALLERY:
      return {
        ...state,
        galleryIsOpen: true,
      };
    case GalleryActionDefinitions.CLOSE_GALLERY:
      return {
        ...state,
        galleryIsOpen: false,
      };
    case GalleryActionDefinitions.OPEN_LIGHTBOX:
      return {
        ...state,
        lightboxIsOpen: true,
      };
    case GalleryActionDefinitions.CLOSE_LIGHTBOX:
      return {
        ...state,
        lightboxIsOpen: false,
      };
    case GalleryActionDefinitions.SELECT_PREVIOUS_PHOTO:
      return {
        ...state,
        selectedPhotoIndex: state.selectedPhotoIndex - 1,
      };
    case GalleryActionDefinitions.SELECT_NEXT_PHOTO:
      return {
        ...state,
        selectedPhotoIndex: state.selectedPhotoIndex + 1,
      };
    case GalleryActionDefinitions.SELECT_PHOTO:
      return {
        ...state,
        selectedPhotoIndex: action.payload.index,
      };
    default:
      return state;
  }
};

export default gallery;
