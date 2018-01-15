import * as React from "react";
import { connect } from "react-redux";

import { IPhotoObject } from "react-photo-gallery";
import {
  closeGallery,
  closeLightbox,
  openLightbox,
  selectNextPhoto,
  selectPhoto,
  selectPreviousPhoto,
} from "../actions/gallery";
import GalleryModal, {
  IGalleryModalDispatchProps,
  IGalleryModalStateProps,
} from "../components/GalleryModal";
import { Dispatch, IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IGalleryModalStateProps => {
  return {
    photos: state.timeline.selectedEvent ? state.timeline.selectedEvent.photos : [],
    galleryIsOpen: state.gallery.galleryIsOpen,
    lightboxIsOpen: state.gallery.lightboxIsOpen,
    currentImage: state.gallery.selectedPhotoIndex,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IGalleryModalDispatchProps => {
  return {
    closeGallery: () => dispatch(closeGallery()),
    closeLightbox: () => dispatch(closeLightbox()),
    gotoNext: () => dispatch(selectNextPhoto()),
    gotoPrevious: () => dispatch(selectPreviousPhoto()),
    openLightbox: (e: any, photoObject: IPhotoObject) => {
      dispatch(selectPhoto(photoObject.index));
      dispatch(openLightbox());
    },
  };
};

const ConnectedGalleryModal = connect(mapStateToProps, mapDispatchToProps)(GalleryModal);

export default ConnectedGalleryModal;
