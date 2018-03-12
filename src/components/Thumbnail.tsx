import * as React from "react";

import { IPhoto } from "../types/gallery";
import { GalleryDimensions, PhotoOrientation } from "../types/gallery";
import { calculateOrientationStyle, getOrientation } from "../util/exif";

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

  private handleLoad = async () => {
    const orientation = await getOrientation(this.props.photo);
    this.setState({
      orientation,
    });
  }
}
