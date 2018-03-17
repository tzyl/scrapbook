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

  private receiveOrientations: (id: string, orientations: PhotoOrientation[], startIndex: number) => any;
  private finishOrientations: (id: string) => any;

  constructor(
    receiveOrientations: (id: string, orientations: PhotoOrientation[], startIndex: number) => any,
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

  public getOrientation = async (photo: IPhoto): Promise<PhotoOrientation> => {
    await getExifDataAsync(photo);
    const orientation = EXIF.getTag(photo, "Orientation");
    return orientation;
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
      let orientations;
      while (currentIndex <= event.photos.length) {
        orientations = await this.getOrientations(event.photos.slice(currentIndex, currentIndex + this.batchSize));
        this.receiveOrientations(id, orientations, currentIndex);
        currentIndex += this.batchSize;
      }
    }
    this.finishOrientations(id);
  }

  private getOrientations = async (photos: IPhoto[]): Promise<PhotoOrientation[]> => {
    const orientations: PhotoOrientation[] = [];
    for (const photo of photos) {
      orientations.push(await this.getOrientation(photo));
    }
    return orientations;
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
