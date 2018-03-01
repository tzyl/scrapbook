import * as _ from "lodash";

import { IEvent, IPhoto } from "../types/events";
import { GalleryDimensions } from "../types/gallery";
import { IThumbnailWorker } from "../types/worker";

// tslint:disable-next-line:no-var-requires
const pica = require("pica/dist/pica")();

export default class ThumbnailWorker implements IThumbnailWorker {
  private events = [] as IEvent[];
  private requests = [] as string[];
  private queue = [] as string[];
  private isRunning = false;
  private batchSize = 25;

  private receiveThumbnails: (id: string, photos: IPhoto[], startIndex: number) => any;
  private finishThumbnails: (id: string) => any;

  constructor(
    receiveThumbnails: (id: string, photos: IPhoto[], startIndex: number) => any,
    finishThumbnails: (id: string) => any,
    batchSize ?: number,
  ) {
    this.batchSize = batchSize;
    this.receiveThumbnails = receiveThumbnails;
    this.finishThumbnails = finishThumbnails;
  }

  public update(events: IEvent[], requests: string[]) {
    this.events = events;
    this.queue = this.queue.concat(_.difference(requests, this.requests));
    this.requests = requests;
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

  private async run() {
    if (this.queue.length > 0 && !this.isRunning) {
      this.isRunning = true;
      while (this.queue.length > 0) {
        await this.executeRequest(this.queue.shift());
      }
      this.isRunning = false;
    }
  }

  private async executeRequest(id: string) {
    const event = _.find(this.events, (evt) => evt.id === id);
    if (event !== undefined) {
      let currentIndex = 0;
      let withThumbnails;
      while (currentIndex <= event.photos.length) {
        withThumbnails = await this.generateThumbnails(event.photos.slice(currentIndex, currentIndex + this.batchSize));
        this.receiveThumbnails(id, withThumbnails, currentIndex);
        currentIndex += this.batchSize;
      }
    }
    this.finishThumbnails(id);
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
