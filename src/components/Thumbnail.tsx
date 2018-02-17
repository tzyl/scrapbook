import * as React from "react";

import { IPhoto } from "../types/events";
import { GalleryDimensions } from "../types/gallery";

export interface IThumbnailProps {
  photo: IPhoto;
  handleClick: () => any;
}

const Thumbnail: React.SFC<IThumbnailProps> = ({
  photo,
  handleClick,
}) => {
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
    />
  );
};

export default Thumbnail;
