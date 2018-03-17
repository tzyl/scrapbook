import { IPhoto, IPhotoDimensions, PhotoOrientation } from "../types/gallery";

export const calculateOrientationStyle = (orientation: PhotoOrientation, dimensions: IPhotoDimensions) => {
  switch (orientation) {
    case PhotoOrientation.TOP_LEFT:
      return {
        ...dimensions,
      };
    case PhotoOrientation.TOP_RIGHT:
      return {
        ...dimensions,
      };
    case PhotoOrientation.BOTTOM_RIGHT:
      return {
        ...dimensions,
        transform: "rotate(180deg)",
      };
    case PhotoOrientation.BOTTOM_LEFT:
      return {
        ...dimensions,
      };
    case PhotoOrientation.LEFT_TOP:
      return {
        width: dimensions.height,
        height: dimensions.height * dimensions.height / dimensions.width,
      };
    case PhotoOrientation.RIGHT_TOP:
      return {
        width: dimensions.height,
        height: dimensions.height * dimensions.height / dimensions.width,
        transform: "rotate(90deg)",
      };
    case PhotoOrientation.RIGHT_BOTTOM:
      return {
        width: dimensions.height,
        height: dimensions.height * dimensions.height / dimensions.width,
      };
    case PhotoOrientation.LEFT_BOTTOM:
      return {
        width: dimensions.height,
        height: dimensions.height * dimensions.height / dimensions.width,
        transform: "rotate(270deg)",
      };
    default:
      return {
        ...dimensions,
      };
  }
};
