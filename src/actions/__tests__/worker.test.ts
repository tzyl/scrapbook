import { IPhoto } from "../../types/gallery";
import { IWorkerAction, WorkerActionDefinitions } from "../../types/worker";
import {
  finishOrientations,
  finishThumbnails,
  receiveOrientations,
  receiveThumbnails,
  requestOrientations,
  requestThumbnails,
} from "../worker";

describe("worker action creators", () => {
  let mockPhotosWithoutThumbnails: IPhoto[];
  let mockPhotosWithThumbnails: IPhoto[];
  let mockPhotosWithoutOrientation: IPhoto[];
  let mockPhotosWithOrientation: IPhoto[];

  beforeEach(() => {
    mockPhotosWithoutThumbnails = [
      {
        src: "src",
        width: 1,
        height: 1,
      },
    ];
    mockPhotosWithThumbnails = [
      {
        src: "src",
        width: 1,
        height: 1,
        thumbnail: "thumbnail",
      },
    ];
    mockPhotosWithoutOrientation = [
      {
        src: "src",
        width: 1,
        height: 1,
      },
    ];
    mockPhotosWithOrientation = [
      {
        src: "src",
        width: 1,
        height: 1,
        orientation: 3,
      },
    ];
  });

  it("creates a request thumbnails action", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
      payload: {
        id: "123",
      },
    };
    expect(requestThumbnails("123")).toEqual(expected);
  });

  it("creates a receive thumbnails action with start index specified", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
      payload: {
        id: "123",
        photos: mockPhotosWithThumbnails,
        startIndex: 1,
      },
    };
    expect(receiveThumbnails("123", mockPhotosWithThumbnails, 1)).toEqual(expected);
  });

  it("creates a receive thumbnails action with default start index at beginning", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
      payload: {
        id: "123",
        photos: mockPhotosWithThumbnails,
        startIndex: 0,
      },
    };
    expect(receiveThumbnails("123", mockPhotosWithThumbnails)).toEqual(expected);
  });

  it("creates a finish thumbnails", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.FINISH_THUMBNAILS,
      payload: {
        id: "123",
      },
    };
    expect(finishThumbnails("123")).toEqual(expected);
  });

  it("creates a request orientation action", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.REQUEST_ORIENTATION,
      payload: {
        id: "123",
      },
    };
    expect(requestOrientations("123")).toEqual(expected);
  });

  it("creates a receive orientation action with start index specified", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.RECEIVE_ORIENTATION,
      payload: {
        id: "123",
        photos: mockPhotosWithOrientation,
        startIndex: 1,
      },
    };
    expect(receiveOrientations("123", mockPhotosWithOrientation, 1)).toEqual(expected);
  });

  it("creates a receive orientation action with default start index at beginning", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.RECEIVE_ORIENTATION,
      payload: {
        id: "123",
        photos: mockPhotosWithOrientation,
        startIndex: 0,
      },
    };
    expect(receiveOrientations("123", mockPhotosWithOrientation)).toEqual(expected);
  });

  it("creates a finish orientation", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.FINISH_ORIENTATION,
      payload: {
        id: "123",
      },
    };
    expect(finishOrientations("123")).toEqual(expected);
  });
});
