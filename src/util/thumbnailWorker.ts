import * as _ from "lodash";

import { IEvent } from "../types/events";
import { GalleryDimensions, IPhoto } from "../types/gallery";
import { IThumbnailWorker } from "../types/worker";

// tslint:disable-next-line:no-var-requires
const pica = require("pica/dist/pica")();

export default class ThumbnailWorker implements IThumbnailWorker {
  private events = [] as IEvent[];
  private thumbnailRequests = [] as string[];
  private queue = [] as string[];
  private isRunning = false;
  private batchSize: number;

  private receiveThumbnails: (id: string, thumbnails: string[], startIndex: number) => any;
  private finishThumbnails: (id: string) => any;

  constructor(
    receiveThumbnails: (id: string, thumbnails: string[], startIndex: number) => any,
    finishThumbnails: (id: string) => any,
    batchSize = 25,
  ) {
    this.batchSize = batchSize;
    this.receiveThumbnails = receiveThumbnails;
    this.finishThumbnails = finishThumbnails;
  }

  public async update(events: IEvent[], thumbnailRequests: string[]) {
    this.events = events;
    this.queue = this.queue.concat(_.difference(thumbnailRequests, this.thumbnailRequests));
    this.thumbnailRequests = thumbnailRequests;
    return this.run();
  }

  public generateThumbnail = async (photo: IPhoto, thumbnailHeight: number): Promise<string> => {
    if (photo.thumbnail || photo.height < 500 || photo.width < 500) {
      return photo.thumbnail || photo.src;
    }
    const from = await this.loadImage(photo.src);
    const to = document.createElement("canvas");
    const ratio = thumbnailHeight / photo.height;
    to.height = photo.height * ratio;
    to.width = photo.width * ratio;

    const resized: HTMLCanvasElement = await pica.resize(from, to);
    const thumbnail = resized.toDataURL("image/jpeg");

    return thumbnail;
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
      let thumbnails;
      while (currentIndex <= event.photos.length) {
        thumbnails = await this.generateThumbnails(event.photos.slice(currentIndex, currentIndex + this.batchSize));
        this.receiveThumbnails(id, thumbnails, currentIndex);
        currentIndex += this.batchSize;
      }
    }
    this.finishThumbnails(id);
  }

  private generateThumbnails = async (photos: IPhoto[]): Promise<string[]> => {
    const thumbnails: string[] = [];
    for (const photo of photos) {
      thumbnails.push(await this.generateThumbnail(photo, GalleryDimensions.THUMBNAIL_HEIGHT));
    }
    return thumbnails;
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
