import * as React from "react";

import { Button } from "@blueprintjs/core";
import { IPhotoObject } from "react-photo-gallery";
import ReactPhotoGallery from "react-photo-gallery";

import { IScrapbookEvent } from "../types/events";
import TitleGroup from "./TitleGroup";

export interface IGalleryOwnProps {
  event: IScrapbookEvent;
  openLightbox: (e: any, photoObject: IPhotoObject) => any;
  closeGallery: () => any;
}

export type IGalleryProps = IGalleryOwnProps;

// TODO: Custom ImageComponent for Gallery which shows thumbnail rather than main image
const Gallery: React.SFC<IGalleryProps> = (props) => {
  const { event, openLightbox, closeGallery } = props;
  const thumbnails = event.photos.map((photo) => {
    return {
      ...photo,
      src: photo.thumbnail || photo.src,
    };
  });
  return (
    <div className="gallery">
      <Button className="modal-close-button pt-minimal" iconName="pt-icon-cross" onClick={closeGallery} />
      <TitleGroup text={event.title} iconName="pt-icon-media" />
      <ReactPhotoGallery photos={thumbnails} onClick={openLightbox} columns={5} />
    </div>
  );
};

export default Gallery;
