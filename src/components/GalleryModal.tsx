import * as React from "react";

import { Button } from "@blueprintjs/core";
import Lightbox, { ILightboxProps } from "react-images";
import Modal = require("react-modal");
import Gallery, { IGalleryProps, IPhotoObject } from "react-photo-gallery";

import { IScrapbookPhoto } from "../types/events";

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

Modal.setAppElement("#root");

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
        <Button iconName="pt-icon-cross" onClick={closeGallery}>Close gallery</Button>
        {/* TODO: Custom ImageComponent for Gallery which shows thumbnail rather than main image */}
        <Gallery photos={photos} onClick={openLightbox} columns={4} />
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
