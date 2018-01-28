import * as React from "react";

import Lightbox from "react-images";
import Modal = require("react-modal");
import { IPhotoObject } from "react-photo-gallery";

import { IScrapbookPhoto } from "../types/events";
import Gallery from "./Gallery";

export interface IGalleryModalStateProps {
  photos: IScrapbookPhoto[];
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
  photos,
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
          photos={photos}
          openLightbox={openLightbox}
          closeGallery={closeGallery}
        />
        <Lightbox
          images={photos}
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
