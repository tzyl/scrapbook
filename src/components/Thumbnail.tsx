import * as React from "react";

import { IPhotoObject } from "react-photo-gallery";

import { IScrapbookPhoto } from "../types/events";

export interface IThumbnailProps {
  photo: IScrapbookPhoto;
  margin: number;
  index: number;
  onClick: (e: any, photoObject: IPhotoObject) => any;
}

const Thumbnail: React.SFC<IThumbnailProps> = ({
  photo,
  margin,
  index,
  onClick,
}) => {
  const handleClick = () => {
    onClick(event, { photo, index });
  };
  const imgStyle = { display: "block", float: "left", margin, cursor: "pointer" };
  if (!photo.thumbnail) {
    return (
      <div
        className="thumbnail-loading"
        style={{ ...imgStyle, width: photo.width, height: photo.height }}
        onClick={handleClick}
      >
        <h5 className="pt-skeleton">Image</h5>
        <div className="pt-skeleton" style={{ height: "50%" }}/>
      </div>
    );
  }
  return (
    <img
      style={imgStyle}
      src={photo.thumbnail}
      width={photo.width}
      height={photo.height}
      onClick={handleClick}
    />
  );
};

export default Thumbnail;
