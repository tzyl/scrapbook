import * as React from "react";

import { Button } from "@blueprintjs/core";
import { IPhotoObject } from "react-photo-gallery";
import ReactPhotoGallery from "react-photo-gallery";

import { IScrapbookEvent } from "../types/events";
import Thumbnail from "./Thumbnail";
import TitleGroup from "./TitleGroup";

export interface IOwnProps {
  event: IScrapbookEvent;
  openLightbox: (e: any, photoObject: IPhotoObject) => any;
  closeGallery: () => any;
}

export type IGalleryProps = IOwnProps;

const Gallery: React.SFC<IGalleryProps> = (props) => {
  const { event, openLightbox, closeGallery } = props;
  return (
    <div className="gallery">
      <Button className="modal-close-button pt-minimal" iconName="pt-icon-cross" onClick={closeGallery} />
      <TitleGroup text={event.title} iconName="pt-icon-media" />
      <ReactPhotoGallery
        ImageComponent={Thumbnail}
        photos={event.photos}
        onClick={openLightbox}
        margin={2}
        columns={6}
      />
    </div>
  );
};

export default Gallery;
