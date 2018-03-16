import { IPhoto, PhotoOrientation } from "../types/gallery";

export const calculateOrientationStyle = (orientation: PhotoOrientation) => {
  switch (orientation) {
    case PhotoOrientation.TOP_LEFT:
      return {};
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
    default:
      return {};
  }
};
