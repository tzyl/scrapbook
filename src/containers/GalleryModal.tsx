import * as React from "react";
import { connect } from "react-redux";

import {
  closeGallery,
  closeLightbox,
  openLightbox,
  selectNextPhoto,
  selectPhoto,
  selectPreviousPhoto,
} from "../actions/gallery";
import GalleryModal, {
  IDispatchProps,
  IStateProps,
} from "../components/GalleryModal";
import { Dispatch, IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IStateProps => {
  return {
    selectedEvent: state.timeline.selectedEvent,
    galleryIsOpen: state.gallery.galleryIsOpen,
    lightboxIsOpen: state.gallery.lightboxIsOpen,
    currentImage: state.gallery.selectedPhotoIndex,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    closeGallery: () => dispatch(closeGallery()),
    closeLightbox: () => dispatch(closeLightbox()),
    gotoNext: () => dispatch(selectNextPhoto()),
    gotoPrevious: () => dispatch(selectPreviousPhoto()),
    openLightbox: (index: number) => {
      dispatch(selectPhoto(index));
      dispatch(openLightbox());
    },
  };
};

const ConnectedGalleryModal = connect(mapStateToProps, mapDispatchToProps)(GalleryModal);

export default ConnectedGalleryModal;
