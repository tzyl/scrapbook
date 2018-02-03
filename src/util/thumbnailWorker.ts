import { IScrapbookPhoto } from "../types/events";
import { IThumbnailRequestResponse } from "../types/worker";

// tslint:disable-next-line:no-var-requires
const pica = require("pica/dist/pica")();

const THUMBNAIL_HEIGHT = 200;

const onmessage = (event: MessageEvent) => {
  console.log(event);
  const request: IThumbnailRequestResponse = event.data;
  console.log(request);
  const withThumbnails = generateThumbnails(request.photos);
  const response: any = {
    id: request.id,
    photos: withThumbnails,
  };
  console.log(response);
  postMessage(response, "*");
};

const generateThumbnails = async (photos: IScrapbookPhoto[]): Promise<IScrapbookPhoto[]> => {
  const withThumbnails = await Promise.all(
    photos.map(async (photo) => this.generateThumbnail(photo, THUMBNAIL_HEIGHT)));
  return withThumbnails;
};

const generateThumbnail = async (photo: IScrapbookPhoto, thumbnailHeight: number): Promise<IScrapbookPhoto> => {
  console.log(photo.src);
  if (photo.thumbnail || photo.height < 500 || photo.width < 500) {
    return photo;
  }
  const from = await this.loadImage(photo.src);
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
