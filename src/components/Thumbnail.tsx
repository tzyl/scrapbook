import * as React from "react";

import { IPhoto, IPhotoDimensions } from "../types/gallery";
import { GalleryDimensions, PhotoOrientation } from "../types/gallery";
import { calculateOrientationStyle } from "../util/orientation";

export interface IThumbnailProps {
  photo: IPhoto;
  handleClick: () => any;
  containerWidth: number;
}

export default class Thumbnail extends React.PureComponent<IThumbnailProps> {
  public render() {
    const { photo, handleClick, containerWidth } = this.props;
    const dimensions: IPhotoDimensions = {
      width: containerWidth * 0.8,
      height: photo.height * containerWidth * 0.8 / photo.width,
      maxHeight: GalleryDimensions.THUMBNAIL_HEIGHT,
      maxWidth: photo.width * GalleryDimensions.THUMBNAIL_HEIGHT / photo.height,
    };
    const orientationStyle = calculateOrientationStyle(photo.orientation, dimensions);
    if (!photo.thumbnail) {
      return (
        <div
          style={{ ...orientationStyle }}
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
        style={{ ...orientationStyle }}
        className="thumbnail"
        src={photo.thumbnail}
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleClick}
      />
    );
  }
}
