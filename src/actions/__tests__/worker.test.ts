import configureMockStore from "redux-mock-store";

import { IPhoto } from "../../types/events";
import { IWorkerAction, WorkerActionDefinitions } from "../../types/worker";
import { finishThumbnails, receiveThumbnails, requestThumbnails } from "../worker";

describe("worker action creators", () => {
  let mockPhotosWithoutThumbnails: IPhoto[];
  let mockPhotosWithThumbnails: IPhoto[];

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
});
