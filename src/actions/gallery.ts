import { GalleryActionDefinitions, IGalleryAction } from "../types/gallery";

export const toggleGalleryOpen = (): IGalleryAction => {
  return {
    type: GalleryActionDefinitions.TOGGLE_GALLERY_OPEN,
  };
};

export const toggleLightboxOpen = (): IGalleryAction => {
  return {
    type: GalleryActionDefinitions.TOGGLE_LIGHTBOX_OPEN,
  };
};

export const selectPhoto = (index: number): IGalleryAction => {
  return {
    payload: {
      index,
    },
    type: GalleryActionDefinitions.SELECT_PHOTO,
  };
};
