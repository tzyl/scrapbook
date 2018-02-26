import { IPhoto } from "../types/events";
import { GalleryDimensions } from "../types/gallery";
import { IThumbnailWorker } from "../types/worker";

// tslint:disable-next-line:no-var-requires
const pica = require("pica/dist/pica")();

export default class ThumbnailWorker implements IThumbnailWorker {

}

const generateThumbnails = async (photos: IPhoto[]): Promise<IPhoto[]> => {
  const withThumbnails: IPhoto[] = [];
  for (const photo of photos) {
    withThumbnails.push(await generateThumbnail(photo, GalleryDimensions.THUMBNAIL_HEIGHT));
  }
  return withThumbnails;
};

const generateThumbnail = async (photo: IPhoto, thumbnailHeight: number): Promise<IPhoto> => {
  if (photo.thumbnail || photo.height < 500 || photo.width < 500) {
    return {
      ...photo,
      thumbnail: photo.thumbnail || photo.src,
    };
  }
  const from = await loadImage(photo.src);
  const to = document.createElement("canvas");
  const ratio = thumbnailHeight / photo.height;
  to.height = photo.height * ratio;
  to.width = photo.width * ratio;

  const resized: HTMLCanvasElement = await pica.resize(from, to);
  const thumbnail = resized.toDataURL("image/jpeg");

  const withThumbnail: IPhoto = {
    ...photo,
    thumbnail,
  };
  return withThumbnail;
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = src;
  });
};
