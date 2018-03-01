import { mockEvents } from "../../mockData";
import { IPhoto } from "../../types/events";
import ThumbnailWorker from "../thumbnailWorker";

const mockPhotoWithoutThumbnail: IPhoto = {
  src: "src",
  height: 500,
  width: 500,
};

const mockPhotoWithThumbnail: IPhoto = {
  src: "src",
  height: 500,
  width: 500,
  thumbnail: "thumbnail",
};

const mockPhotoSmallHeight: IPhoto = {
  src: "src",
  height: 1,
  width: 500,
};

const mockPhotoSmallWidth: IPhoto = {
  src: "src",
  height: 500,
  width: 1,
};

describe("thumbnail worker", () => {
  let thumbnailWorker;
  let receiveThumbnails;
  let finishThumbnails;

  beforeEach(() => {
    receiveThumbnails = jest.fn();
    finishThumbnails = jest.fn();
    thumbnailWorker = new ThumbnailWorker(receiveThumbnails, finishThumbnails, 10);
  });

  it("initializes correctly", () => {
    expect(thumbnailWorker.events).toHaveLength(0);
    expect(thumbnailWorker.requests).toHaveLength(0);
    expect(thumbnailWorker.queue).toHaveLength(0);
    expect(thumbnailWorker.isRunning).toBe(false);
    expect(thumbnailWorker.batchSize).toBe(10);
    expect(thumbnailWorker.receiveThumbnails).toBe(receiveThumbnails);
    expect(thumbnailWorker.finishThumbnails).toBe(finishThumbnails);
  });

  it("generates thumbnail when height and width >= 500", async () => {
    // TODO: mock this
    // expect(await thumbnailWorker.generateThumbnail(mockPhotoWithoutThumbnail, 150)).toEqual(mockPhotoWithThumbnail);
  });

  it("uses src for thumbnail if width or height < 500", async () => {
    expect(await thumbnailWorker.generateThumbnail(mockPhotoSmallHeight, 150)).toEqual(
      {
        ...mockPhotoSmallHeight,
        thumbnail: mockPhotoSmallHeight.src,
      },
    );
    expect(await thumbnailWorker.generateThumbnail(mockPhotoSmallWidth, 150)).toEqual(
      {
        ...mockPhotoSmallWidth,
        thumbnail: mockPhotoSmallWidth.src,
      },
    );
  });

  it("uses existing thumbnail if present", async () => {
    expect(await thumbnailWorker.generateThumbnail(mockPhotoWithThumbnail, 150)).toEqual(mockPhotoWithThumbnail);
  });
});
