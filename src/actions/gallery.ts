import { GalleryActionDefinitions, IGalleryAction } from "../types/gallery";

export const openGallery = (): IGalleryAction => {
  return {
    type: GalleryActionDefinitions.OPEN_GALLERY,
  };
};

export const closeGallery = (): IGalleryAction => {
  return {
    type: GalleryActionDefinitions.CLOSE_GALLERY,
  };
};

export const openLightbox = (): IGalleryAction => {
  return {
    type: GalleryActionDefinitions.OPEN_LIGHTBOX,
  };
};

export const closeLightbox = (): IGalleryAction => {
  return {
    type: GalleryActionDefinitions.CLOSE_LIGHTBOX,
  };
};

export const selectPreviousPhoto = (): IGalleryAction => {
  return {
    type: GalleryActionDefinitions.SELECT_PREVIOUS_PHOTO,
  };
};

export const selectNextPhoto = (): IGalleryAction => {
  return {
    type: GalleryActionDefinitions.SELECT_NEXT_PHOTO,
  };
};

export const selectPhoto = (index: number): IGalleryAction => {
  return {
    type: GalleryActionDefinitions.SELECT_PHOTO,
    payload: {
      index,
    },
  };
};
