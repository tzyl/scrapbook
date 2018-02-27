import { IEvent, IPhoto } from "../types/events";
import { GalleryDimensions } from "../types/gallery";
import { IThumbnailWorker } from "../types/worker";

// tslint:disable-next-line:no-var-requires
const pica = require("pica/dist/pica")();

export default class ThumbnailWorker implements IThumbnailWorker {
  private events: IEvent[];
  private requests: string[];
  private queue: string[];
  private isRunning: boolean;

  private receiveThumbnails: (id: string, photos: IPhoto[], startIndex: number) => any;
  private finishThumbnails: (id: string) => any;

  constructor(
    receiveThumbnails: (id: string, photos: IPhoto[], startIndex: number) => any,
    finishThumbnails: (id: string) => any,
  ) {
    this.queue = [];
    this.isRunning = false;
    this.receiveThumbnails = receiveThumbnails;
    this.finishThumbnails = finishThumbnails;
  }

  public update(events: IEvent[], requests: string[]) {
    this.events = events;
    this.run();
  }

  public generateThumbnail = async (photo: IPhoto, thumbnailHeight: number): Promise<IPhoto> => {
    if (photo.thumbnail || photo.height < 500 || photo.width < 500) {
      return {
        ...photo,
        thumbnail: photo.thumbnail || photo.src,
      };
    }
    const from = await this.loadImage(photo.src);
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
  }

  private run() {
    if (this.queue.length > 0 && !this.isRunning) {
      this.isRunning = true;
      while (this.queue.length > 0) {
        this.executeRequest(this.queue.shift());
      }
      this.isRunning = false;
    }
  }

  private executeRequest(id: string) {
    return;
  }

  private generateThumbnails = async (photos: IPhoto[]): Promise<IPhoto[]> => {
    const withThumbnails: IPhoto[] = [];
    for (const photo of photos) {
      withThumbnails.push(await this.generateThumbnail(photo, GalleryDimensions.THUMBNAIL_HEIGHT));
    }
    return withThumbnails;
  }

  private loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.src = src;
    });
  }
}
