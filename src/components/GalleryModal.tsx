import * as React from "react";

import { Button } from "@blueprintjs/core";
import Lightbox from "react-images";
import Modal = require("react-modal");

import { IEvent } from "../types/events";
import Gallery from "./Gallery";
import TitleGroup from "./TitleGroup";

export interface IStateProps {
  selectedEvent: IEvent;
  galleryIsOpen: boolean;
  lightboxIsOpen: boolean;
  currentImage: number;
}

export interface IDispatchProps {
  closeGallery: () => any;
  openLightbox: (index: number) => any;
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
      <Button className="modal-close-button pt-minimal" iconName="pt-icon-cross" onClick={closeGallery} />
      <TitleGroup text={selectedEvent.title} iconName="pt-icon-media" />
      <Gallery
        photos={selectedEvent.photos}
        openLightbox={openLightbox}
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
