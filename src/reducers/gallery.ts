import { IStoreGalleryState } from "../types/gallery";
import { IAction } from "../types/redux";

const defaultState: IStoreGalleryState = {
  galleryIsOpen: false,
  lightboxIsOpen: false,
  selectedPhotoIndex: null,
};

const gallery = (state = defaultState, action: IAction): IStoreGalleryState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default gallery;
