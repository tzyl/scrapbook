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
import ScrapbookGallery, {
  IScrapbookGalleryDispatchProps,
  IScrapbookGalleryStateProps,
} from "../components/ScrapbookGallery";
import { Dispatch, IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IScrapbookGalleryStateProps => {
  return {
    currentImage: state.gallery.selectedPhotoIndex,
    galleryIsOpen: state.gallery.galleryIsOpen,
    lightboxIsOpen: state.gallery.lightboxIsOpen,
    photos: state.timeline.selectedEvent ? state.timeline.selectedEvent.photos : null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IScrapbookGalleryDispatchProps => {
  return {
    closeGallery: () => dispatch(closeGallery()),
    closeLightbox: () => dispatch(closeLightbox()),
    gotoNext: () => dispatch(selectNextPhoto()),
    gotoPrevious: () => dispatch(selectPreviousPhoto()),
    openLightbox: (event: any, photoObject: IPhotoObject) => {
      dispatch(selectPhoto(photoObject.index));
      dispatch(openLightbox());
    },
  };
};

const ConnectedScrapbookGallery = connect(mapStateToProps, mapDispatchToProps)(ScrapbookGallery);

export default ConnectedScrapbookGallery;
