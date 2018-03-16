import * as React from "react";

import { IPhoto } from "../types/gallery";
import { GalleryDimensions, PhotoOrientation } from "../types/gallery";
import { calculateOrientationStyle } from "../util/orientation";

export interface IThumbnailProps {
  photo: IPhoto;
  handleClick: () => any;
}

export default class Thumbnail extends React.PureComponent<IThumbnailProps> {
  public render() {
    const { photo, handleClick } = this.props;
    const dimensions = {
      width: photo.width * GalleryDimensions.THUMBNAIL_HEIGHT / photo.height,
      height: GalleryDimensions.THUMBNAIL_HEIGHT,
    };
    const orientationStyle = calculateOrientationStyle(photo.orientation);
    if (!photo.thumbnail) {
      return (
        <div
          style={{ ...dimensions, ...orientationStyle }}
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
