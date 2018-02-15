import * as React from "react";

import { IScrapbookPhoto } from "../types/events";
import Thumbnail from "./Thumbnail";

export interface IOwnProps {
  photos: IScrapbookPhoto[];
  photoHeight: number;
  rowHeight: number;
  startIndex: number;
  openLightbox: (index: number) => any;
}

export type IGalleryRowProps = IOwnProps;

export default class GalleryRow extends React.Component<IGalleryRowProps> {
  public render() {
    const { rowHeight } = this.props;
    return (
      <div className="gallery-row" style={{ height: rowHeight }}>
        {this.renderThumbnails()}
      </div>
    );
  }

  public renderThumbnails = () => {
    const { photos, photoHeight, startIndex, openLightbox } = this.props;
    return photos.map((photo, index) => {
      const resized = {
        ...photo,
        height: photoHeight,
        width: photo.width * photoHeight / photo.height,
      };
      return (
        <Thumbnail
          key={startIndex + index}
          photo={resized}
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
