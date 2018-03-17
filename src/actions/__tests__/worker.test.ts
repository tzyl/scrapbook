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
  let mockPhotosWithoutOrientation: IPhoto[];

  beforeEach(() => {
    mockPhotosWithoutThumbnails = [
      {
        src: "src",
        width: 1,
        height: 1,
      },
    ];
    mockPhotosWithoutOrientation = [
      {
        src: "src",
        width: 1,
        height: 1,
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
        thumbnails: ["thumbnail"],
        startIndex: 1,
      },
    };
    expect(receiveThumbnails("123", ["thumbnail"], 1)).toEqual(expected);
  });

  it("creates a receive thumbnails action with default start index at beginning", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
      payload: {
        id: "123",
        thumbnails: ["thumbnail"],
        startIndex: 0,
      },
    };
    expect(receiveThumbnails("123", ["thumbnail"])).toEqual(expected);
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
      type: WorkerActionDefinitions.REQUEST_ORIENTATIONS,
      payload: {
        id: "123",
      },
    };
    expect(requestOrientations("123")).toEqual(expected);
  });

  it("creates a receive orientation action with start index specified", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.RECEIVE_ORIENTATIONS,
      payload: {
        id: "123",
        orientations: [1],
        startIndex: 1,
      },
    };
    expect(receiveOrientations("123", [1], 1)).toEqual(expected);
  });

  it("creates a receive orientation action with default start index at beginning", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.RECEIVE_ORIENTATIONS,
      payload: {
        id: "123",
        orientations: [1],
        startIndex: 0,
      },
    };
    expect(receiveOrientations("123", [1])).toEqual(expected);
  });

  it("creates a finish orientation", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.FINISH_ORIENTATIONS,
      payload: {
        id: "123",
      },
    };
    expect(finishOrientations("123")).toEqual(expected);
  });
});
