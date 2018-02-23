import { IPhoto } from "../../types/events";
import { IWorkerAction, WorkerActionDefinitions } from "../../types/worker";
import { receiveThumbnails, requestThumbnails, requestThumbnailsThenUpdate } from "../worker";

describe("worker action creators", () => {
  it("creates a request thumbnails action", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
      payload: {
        id: "123",
      },
    };
    expect(requestThumbnails("123")).toEqual(expected);
  });

  it("creates a receive thumbnails action", () => {
    const mockPhotosWithThumbnails: IPhoto[] = [
      {
        src: "src",
        width: 1,
        height: 1,
        thumbnail: "thumbnail",
      },
    ];
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
      payload: {
        id: "123",
        photos: mockPhotosWithThumbnails,
      },
    };
    expect(receiveThumbnails("123", mockPhotosWithThumbnails)).toEqual(expected);
  });

  it("dispatches a request thumbnails action then waits to receive thumbnails", () => {
    return;
  });
});
