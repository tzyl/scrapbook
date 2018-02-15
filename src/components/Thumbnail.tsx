import * as React from "react";

import { IPhotoObject } from "react-photo-gallery";

import { IScrapbookPhoto } from "../types/events";

export interface IThumbnailProps {
  photo: IScrapbookPhoto;
  handleClick: () => any;
}

const Thumbnail: React.SFC<IThumbnailProps> = ({
  photo,
  handleClick,
}) => {
  const dimensions = { width: photo.width, height: photo.height };
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
