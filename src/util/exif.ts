import * as EXIF from "exif-js";
import { promisify } from "util";

import { IPhoto, PhotoOrientation } from "../types/gallery";

const getExifDataAsync = promisify(EXIF.getData);

export const getOrientation = async (photo: IPhoto): Promise<PhotoOrientation> => {
  await getExifDataAsync(photo);
  return EXIF.getTag(photo, "Orientation");
};

export const calculateOrientationStyle = (orientation: PhotoOrientation) => {
  switch (orientation) {
    case PhotoOrientation.TOP_LEFT:
      return {};
    case PhotoOrientation.TOP_LEFT:
      return {
        transform: "rotate(0deg)",
      };
    case PhotoOrientation.TOP_RIGHT:
      return {
      };
    case PhotoOrientation.BOTTOM_RIGHT:
      return {
        transform: "rotate(180deg)",
      };
    case PhotoOrientation.BOTTOM_LEFT:
      return {
      };
    case PhotoOrientation.LEFT_TOP:
      return {

      };
    case PhotoOrientation.RIGHT_TOP:
      return {
        transform: "rotate(90deg)",
      };
    case PhotoOrientation.RIGHT_BOTTOM:
      return {

      };
    case PhotoOrientation.LEFT_BOTTOM:
      return {
        transform: "rotate(270deg)",
      };
  }
};
