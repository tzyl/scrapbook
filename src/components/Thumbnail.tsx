import * as React from "react";

import * as EXIF from "exif-js";

import { IPhoto } from "../types/events";
import { GalleryDimensions, PhotoOrientation } from "../types/gallery";
import { calculateOrientationStyle } from "../util/exif";

export interface IThumbnailProps {
  photo: IPhoto;
  handleClick: () => any;
}

export interface IThumbnailState {
  orientation: PhotoOrientation;
}

export default class Thumbnail extends React.PureComponent<IThumbnailProps, IThumbnailState> {
  public state: IThumbnailState = {
    orientation: PhotoOrientation.TOP_LEFT,
  };
  private image: HTMLImageElement;

  public render() {
    const { photo, handleClick } = this.props;
    const dimensions = {
      width: photo.width * GalleryDimensions.THUMBNAIL_HEIGHT / photo.height,
      height: GalleryDimensions.THUMBNAIL_HEIGHT,
    };
    const orientationStyle = calculateOrientationStyle(this.state.orientation);
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
        ref={(image) => this.image = image}
        src={photo.thumbnail}
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleClick}
        onLoad={this.handleLoad}
      />
    );
  }

  private handleLoad = () => {
    this.setState((prevState) => {
      let orientation: PhotoOrientation;
      EXIF.getData(this.props.photo, function() {
        orientation = EXIF.getTag(this, "Orientation");
        return {
          orientation,
        };
      });
    });
  }
}
