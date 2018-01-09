import * as React from "react";

import Lightbox, { ILightboxProps } from "react-images";
import Gallery, { IGalleryProps, IPhotoObject } from "react-photo-gallery";
import { IScrapbookPhoto } from "../types/events";

export interface IScrapbookGalleryProps {
  photos: IScrapbookPhoto[];
  galleryIsOpen: boolean;
  lightboxIsOpen: boolean;
  openLightbox: (event: any, photoObject: IPhotoObject) => any;
  closeLightbox: (event: any) => any;
  gotoPrevious: (event: any) => any;
  gotoNext: (event: any) => any;
  currentImage: number;
}

const ScrapbookGallery: React.SFC<IScrapbookGalleryProps> = ({
  photos,
  galleryIsOpen,
  lightboxIsOpen,
  openLightbox,
  closeLightbox,
  gotoPrevious,
  gotoNext,
  currentImage,
}) => {
  if (!galleryIsOpen) { return null; }
  return (
    <div>
        <Gallery photos={photos} onClick={openLightbox} />
        <Lightbox
          images={photos}
          onClose={closeLightbox}
          onClickPrev={gotoPrevious}
          onClickNext={gotoNext}
          currentImage={currentImage}
          isOpen={lightboxIsOpen}
        />
    </div>
  );
};

export default ScrapbookGallery;
