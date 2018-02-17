import * as React from "react";

import { IScrapbookPhoto } from "../types/events";
import { GalleryDimensions } from "../types/gallery";
import Thumbnail from "./Thumbnail";

export interface IOwnProps {
  photos: IScrapbookPhoto[];
  startIndex: number;
  openLightbox: (index: number) => any;
}

export type IGalleryRowProps = IOwnProps;

export default class GalleryRow extends React.Component<IGalleryRowProps> {
  public render() {
    const { photos } = this.props;
    const height = GalleryDimensions.THUMBNAIL_HEIGHT + GalleryDimensions.ROW_VERTICAL_MARGIN;
    const maxWidth = photos
      ? photos
          .map((photo) => photo.width * GalleryDimensions.THUMBNAIL_HEIGHT / photo.height)
          .reduce((a, b) => a + b, 0) + GalleryDimensions.ROW_HORIZONTAL_MARGIN * photos.length
          : "100%";
    return (
      <div className="gallery-row" style={{ height, maxWidth }}>
        {this.renderThumbnails()}
      </div>
    );
  }

  public renderThumbnails = () => {
    const { photos, startIndex, openLightbox } = this.props;
    return photos.map((photo, index) => {
      return (
        <Thumbnail
          key={startIndex + index}
          photo={photo}
          handleClick={this.openLightboxAtIndex(startIndex + index)}
        />
      );
    });
  }

  private openLightboxAtIndex = (index: number) => () => {
    const { openLightbox } = this.props;
    openLightbox(index);
  }
}
