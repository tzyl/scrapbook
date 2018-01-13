import * as React from "react";

import Lightbox, { ILightboxProps } from "react-images";
import Modal = require("react-modal");
import Gallery, { IGalleryProps, IPhotoObject } from "react-photo-gallery";
import { IScrapbookPhoto } from "../types/events";

export interface IScrapbookGalleryStateProps {
  photos: IScrapbookPhoto[];
  galleryIsOpen: boolean;
  lightboxIsOpen: boolean;
  currentImage: number;
}

export interface IScrapbookGalleryDispatchProps {
  closeGallery: (event: any) => any;
  openLightbox: (event: any, photoObject: IPhotoObject) => any;
  closeLightbox: (event: any) => any;
  gotoPrevious: (event: any) => any;
  gotoNext: (event: any) => any;
}

export type IScrapbookGalleryProps = IScrapbookGalleryStateProps & IScrapbookGalleryDispatchProps;

Modal.setAppElement("#root");

const ScrapbookGallery: React.SFC<IScrapbookGalleryProps> = ({
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
  return (
    <Modal
      isOpen={galleryIsOpen}
      onRequestClose={closeGallery}
      shouldCloseOnEsc={false}
    >
        <button onClick={closeGallery}>Close gallery</button>
        <Gallery photos={photos} onClick={openLightbox} />
        <Lightbox
          images={photos}
          onClose={closeLightbox}
          onClickPrev={gotoPrevious}
          onClickNext={gotoNext}
          currentImage={currentImage}
          isOpen={lightboxIsOpen}
        />
    </Modal>
  );
};

export default ScrapbookGallery;
