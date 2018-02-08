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
  if (!photo.thumbnail) {
    return (
      <div className="pt-card">
        <h5 className="pt-skeleton">Card heading</h5>
        <p className="pt-skeleton">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget tortor felis.
          Fusce dapibus metus in dapibus mollis. Quisque eget ex diam.
        </p>
        <p className="pt-skeleton">Lorem ipsum dolor</p>
      </div>
    );
  }

  const handleClick = () => {
    onClick(event, { photo, index });
  };
  const imgWithClick = { cursor: "pointer" };
  const imgStyle = { display: "block", float: "left", margin };
  return (
    <img
      style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
      src={photo.thumbnail}
      width={photo.width}
      height={photo.height}
      onClick={onClick ? handleClick : null}
    />
  );
};

export default Thumbnail;
