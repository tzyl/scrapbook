import * as EXIF from "exif-js";
import * as _ from "lodash";
import { promisify } from "util";

import { IEvent } from "../types/events";
import { IPhoto, PhotoOrientation } from "../types/gallery";
import { IOrientationWorker } from "../types/worker";

// tslint:disable-next-line:no-var-requires
const pica = require("pica/dist/pica")();
const getExifDataAsync = promisify(EXIF.getData);

export default class OrientationWorker implements IOrientationWorker {
  private events = [] as IEvent[];
  private orientationRequests = [] as string[];
  private queue = [] as string[];
  private isRunning = false;
  private batchSize: number;

  private receiveOrientations: (id: string, photos: IPhoto[], startIndex: number) => any;
  private finishOrientations: (id: string) => any;

  constructor(
    receiveOrientations: (id: string, photos: IPhoto[], startIndex: number) => any,
    finishOrientations: (id: string) => any,
    batchSize = 25,
  ) {
    this.batchSize = batchSize;
    this.receiveOrientations = receiveOrientations;
    this.finishOrientations = finishOrientations;
  }

  public async update(events: IEvent[], orientationRequests: string[]) {
    this.events = events;
    this.queue = this.queue.concat(_.difference(orientationRequests, this.orientationRequests));
    this.orientationRequests = orientationRequests;
    return this.run();
  }

  public getOrientation = async (photo: IPhoto): Promise<IPhoto> => {
    await getExifDataAsync(photo);
    const orientation = EXIF.getTag(photo, "Orientation");
    if (orientation === undefined) {
      return photo;
    }
    return {
      ...photo,
      orientation,
    };
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
      let withOrientation;
      while (currentIndex <= event.photos.length) {
        withOrientation = await this.getOrientations(event.photos.slice(currentIndex, currentIndex + this.batchSize));
        this.receiveOrientations(id, withOrientation, currentIndex);
        currentIndex += this.batchSize;
      }
    }
    this.finishOrientations(id);
  }

  private getOrientations = async (photos: IPhoto[]): Promise<IPhoto[]> => {
    const withOrientation: IPhoto[] = [];
    for (const photo of photos) {
      withOrientation.push(await this.getOrientation(photo));
    }
    return withOrientation;
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
