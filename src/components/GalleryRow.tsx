import * as React from "react";

import { IPhoto } from "../types/events";
import { GalleryDimensions } from "../types/gallery";
import Thumbnail from "./Thumbnail";

export interface IOwnProps {
  photos: IPhoto[];
  startIndex: number;
  length: number;
  openLightbox: (index: number) => any;
}

export type IGalleryRowProps = IOwnProps;

export default class GalleryRow extends React.Component<IGalleryRowProps> {
  public render() {
    const { photos, startIndex, length } = this.props;
    const height = GalleryDimensions.THUMBNAIL_HEIGHT + GalleryDimensions.ROW_VERTICAL_MARGIN;
    let maxWidth = 0;
    for (let i = startIndex; i < startIndex + length; i++) {
      maxWidth += photos[i].width * GalleryDimensions.THUMBNAIL_HEIGHT / photos[i].height;
      maxWidth += GalleryDimensions.ROW_HORIZONTAL_MARGIN;
    }
    return (
      <div className="gallery-row" style={{ height, maxWidth }}>
        {this.renderThumbnails()}
      </div>
    );
  }

  public renderThumbnails = () => {
    const { photos, startIndex, length, openLightbox } = this.props;
    const thumbnails = [];
    for (let i = startIndex; i < startIndex + length; i++) {
      thumbnails.push(
        <Thumbnail
          key={i}
          photo={photos[i]}
          handleClick={this.openLightboxAtIndex(i)}
        />,
      );
    }
    return thumbnails;
  }

  private openLightboxAtIndex = (index: number) => () => {
    const { openLightbox } = this.props;
    openLightbox(index);
  }
}
