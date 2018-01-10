import { GalleryActionDefinitions, IStoreGalleryState } from "../types/gallery";
import { IAction } from "../types/redux";

const defaultState: IStoreGalleryState = {
  galleryIsOpen: false,
  lightboxIsOpen: false,
  selectedPhotoIndex: null,
};

const gallery = (state = defaultState, action: IAction): IStoreGalleryState => {
  switch (action.type) {
    case GalleryActionDefinitions.TOGGLE_GALLERY_OPEN:
    return {
      ...state,
      galleryIsOpen: !state.galleryIsOpen,
    };
    case GalleryActionDefinitions.TOGGLE_LIGHTBOX_OPEN:
    return {
      ...state,
      lightboxIsOpen: !state.lightboxIsOpen,
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
