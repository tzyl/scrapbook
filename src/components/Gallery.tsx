import * as React from "react";

import { Button } from "@blueprintjs/core";
import { IPhotoObject } from "react-photo-gallery";
import ReactPhotoGallery from "react-photo-gallery";

import { IScrapbookPhoto } from "../types/events";
import GalleryTitle from "./GalleryTitle";

export interface IGalleryOwnProps {
  photos: IScrapbookPhoto[];
  openLightbox: (e: any, photoObject: IPhotoObject) => any;
  closeGallery: () => any;
}

export type IGalleryProps = IGalleryOwnProps;

// TODO: Custom ImageComponent for Gallery which shows thumbnail rather than main image
// TODO: Connect to event to display title etc.
const Gallery: React.SFC<IGalleryProps> = (props) => {
  const { photos, openLightbox, closeGallery } = props;
  return (
    <div className="gallery">
      <Button className="gallery-close-button pt-minimal" iconName="pt-icon-cross" onClick={closeGallery} />
      <GalleryTitle />
      <ReactPhotoGallery photos={photos} onClick={openLightbox} columns={4} />
    </div>
  );
};

export default Gallery;
