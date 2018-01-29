import * as React from "react";

import Lightbox from "react-images";
import Modal = require("react-modal");
import { IPhotoObject } from "react-photo-gallery";

import { IScrapbookEvent } from "../types/events";
import Gallery from "./Gallery";

export interface IGalleryModalStateProps {
  event: IScrapbookEvent;
  galleryIsOpen: boolean;
  lightboxIsOpen: boolean;
  currentImage: number;
}

export interface IGalleryModalDispatchProps {
  closeGallery: () => any;
  openLightbox: (e: any, photoObject: IPhotoObject) => any;
  closeLightbox: () => any;
  gotoPrevious: () => any;
  gotoNext: () => any;
}

export type IGalleryModalProps = IGalleryModalStateProps & IGalleryModalDispatchProps;

const GalleryModal: React.SFC<IGalleryModalProps> = ({
  event,
  galleryIsOpen,
  lightboxIsOpen,
  currentImage,
  closeGallery,
  openLightbox,
  closeLightbox,
  gotoPrevious,
  gotoNext,
}) => {
  const modalStyles = {overlay: {zIndex: 10}};
  return (
    <Modal
      isOpen={galleryIsOpen}
      onRequestClose={closeGallery}
      shouldCloseOnEsc={false}
      style={modalStyles}
    >
        <Gallery
          event={event}
          openLightbox={openLightbox}
          closeGallery={closeGallery}
        />
        <Lightbox
          images={event.photos}
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
