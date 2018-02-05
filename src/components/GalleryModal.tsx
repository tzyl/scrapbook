import * as React from "react";

import Lightbox from "react-images";
import Modal = require("react-modal");
import { IPhotoObject } from "react-photo-gallery";

import { IScrapbookEvent } from "../types/events";
import Gallery from "./Gallery";

export interface IStateProps {
  selectedEvent: IScrapbookEvent;
  galleryIsOpen: boolean;
  lightboxIsOpen: boolean;
  currentImage: number;
}

export interface IDispatchProps {
  closeGallery: () => any;
  openLightbox: (e: any, photoObject: IPhotoObject) => any;
  closeLightbox: () => any;
  gotoPrevious: () => any;
  gotoNext: () => any;
}

export type IGalleryModalProps = IStateProps & IDispatchProps;

const GalleryModal: React.SFC<IGalleryModalProps> = ({
  selectedEvent,
  galleryIsOpen,
  lightboxIsOpen,
  currentImage,
  closeGallery,
  openLightbox,
  closeLightbox,
  gotoPrevious,
  gotoNext,
}) => {
  if (!selectedEvent) {
    return null;
  }
  const modalStyles = {overlay: {zIndex: 10}};
  return (
    <Modal
      isOpen={galleryIsOpen}
      onRequestClose={closeGallery}
      shouldCloseOnEsc={false}
      style={modalStyles}
    >
        <Gallery
          event={selectedEvent}
          openLightbox={openLightbox}
          closeGallery={closeGallery}
        />
        <Lightbox
          images={selectedEvent.photos}
          onClose={closeLightbox}
          onClickPrev={gotoPrevious}
          onClickNext={gotoNext}
          currentImage={currentImage}
          isOpen={lightboxIsOpen}
          backdropClosesModal={true}
        />
    </Modal>
  );
};

export default GalleryModal;
