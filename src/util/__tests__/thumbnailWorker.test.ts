import { IPhoto } from "../../types/gallery";

import ThumbnailWorker from "../thumbnailWorker";

jest.mock("pica/dist/pica", () => () => ({
    resize: () => ({
        toDataURL: () => "thumbnail",
    }),
  }),
);

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
  let loadImage;

  beforeEach(() => {
    receiveThumbnails = jest.fn();
    finishThumbnails = jest.fn();
    loadImage = jest.fn();
    thumbnailWorker = new ThumbnailWorker(receiveThumbnails, finishThumbnails, 10);
    (thumbnailWorker as any).loadImage = loadImage;

  });

  it("initializes correctly", () => {
    expect(thumbnailWorker.events).toHaveLength(0);
    expect(thumbnailWorker.thumbnailRequests).toHaveLength(0);
    expect(thumbnailWorker.queue).toHaveLength(0);
    expect(thumbnailWorker.isRunning).toBe(false);
    expect(thumbnailWorker.batchSize).toBe(10);
    expect(thumbnailWorker.receiveThumbnails).toBe(receiveThumbnails);
    expect(thumbnailWorker.finishThumbnails).toBe(finishThumbnails);
  });

  it("updates then runs", async () => {
    const mockExecuteRequest = jest.fn();
    (thumbnailWorker as any).executeRequest = mockExecuteRequest;
    await thumbnailWorker.update(undefined, ["1", "2", "3"]);
    expect(mockExecuteRequest).toHaveBeenCalledTimes(3);
  });

  it("receives and finishes thumbnails", async () => {
    await thumbnailWorker.update([{ id: "1", photos: [mockPhotoWithoutThumbnail] }], ["1"]);
    expect(loadImage).toHaveBeenCalledTimes(1);
    expect(receiveThumbnails).toHaveBeenCalledTimes(1);
    expect(finishThumbnails).toHaveBeenCalledTimes(1);
  });

  it("generates thumbnail when height and width >= 500", async () => {
    const result = await thumbnailWorker.generateThumbnail(mockPhotoWithoutThumbnail, 150);
    expect(loadImage).toHaveBeenCalledTimes(1);
    expect(result).toEqual("thumbnail");
  });

  it("generates thumbnails when height and width >= 500", async () => {
    const result = await (thumbnailWorker as any).generateThumbnails([mockPhotoWithoutThumbnail], 150);
    expect(loadImage).toHaveBeenCalledTimes(1);
    expect(result).toEqual(["thumbnail"]);
  });

  it("uses src for thumbnail if width or height < 500", async () => {
    expect(await thumbnailWorker.generateThumbnail(mockPhotoSmallHeight, 150)).toEqual(mockPhotoSmallHeight.src);
    expect(await thumbnailWorker.generateThumbnail(mockPhotoSmallWidth, 150)).toEqual(mockPhotoSmallWidth.src);
  });

  it("uses existing thumbnail if present", async () => {
    expect(await thumbnailWorker.generateThumbnail(mockPhotoWithThumbnail, 150))
      .toEqual(mockPhotoWithThumbnail.thumbnail);
  });
});
