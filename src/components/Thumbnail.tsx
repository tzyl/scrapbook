import * as React from "react";

import EXIF from "exif-js";

import { IPhoto } from "../types/events";
import { GalleryDimensions, PhotoOrientation } from "../types/gallery";

export interface IThumbnailProps {
  photo: IPhoto;
  handleClick: () => any;
  // TODO: make handleLoad get exif orientation data
  handleLoad: () => any;
}

export interface IThumbnailState {
  orientation: PhotoOrientation;
}

export default class Thumbnail extends React.PureComponent<IThumbnailProps, IThumbnailState> {
  // TODO: move this into props so thumbnail is presentational only
  public state: IThumbnailState = {
    orientation: PhotoOrientation.TOP_LEFT,
  };

  public render() {
    const { photo, handleClick } = this.props;
    const dimensions = {
      width: photo.width * GalleryDimensions.THUMBNAIL_HEIGHT / photo.height,
      height: GalleryDimensions.THUMBNAIL_HEIGHT,
    };
    if (!photo.thumbnail) {
      return (
        <div
          style={{ ...dimensions }}
          className="thumbnail thumbnail-loading"
          onClick={handleClick}
        >
          <h5 className="pt-skeleton">Image</h5>
          <div className="pt-skeleton" style={{ height: "50%" }}/>
        </div>
      );
    }
    return (
      <img
        className="thumbnail"
        src={photo.thumbnail}
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleClick}
        onLoad={handleLoad}
      />
    );
  }
}
