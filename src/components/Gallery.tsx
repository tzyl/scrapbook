import * as React from "react";

import { Button } from "@blueprintjs/core";
import { IPhotoObject } from "react-photo-gallery";

import { IScrapbookEvent } from "../types/events";
import GalleryRowContainer from "./GalleryRowContainer";
import Thumbnail from "./Thumbnail";
import TitleGroup from "./TitleGroup";

export interface IOwnProps {
  event: IScrapbookEvent;
  openLightbox: (index: number) => any;
  closeGallery: () => any;
}

export type IGalleryProps = IOwnProps;

export default class Gallery extends React.Component<IGalleryProps> {
  public render() {
    const { event, openLightbox, closeGallery } = this.props;
    return (
      <div className="gallery">
        <Button className="modal-close-button pt-minimal" iconName="pt-icon-cross" onClick={closeGallery} />
        <TitleGroup text={event.title} iconName="pt-icon-media" />
        <GalleryRowContainer photos={event.photos} openLightbox={openLightbox} />
      </div>
    );
  }
}
