import { IScrapbookPhoto } from "../types/events";

// tslint:disable-next-line:no-var-requires
const pica = require("pica/dist/pica")();

const THUMBNAIL_HEIGHT = 150;

const generateThumbnails = async (photos: IScrapbookPhoto[]): Promise<IScrapbookPhoto[]> => {
  const withThumbnails: IScrapbookPhoto[] = [];
  for (const photo of photos) {
    withThumbnails.push(await generateThumbnail(photo, THUMBNAIL_HEIGHT));
  }
  return withThumbnails;
};

const generateThumbnail = async (photo: IScrapbookPhoto, thumbnailHeight: number): Promise<IScrapbookPhoto> => {
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

  const withThumbnail: IScrapbookPhoto = {
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

export default generateThumbnails;
