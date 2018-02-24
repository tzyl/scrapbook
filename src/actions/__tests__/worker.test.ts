import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { IPhoto } from "../../types/events";
import { IWorkerAction, WorkerActionDefinitions } from "../../types/worker";
import generateThumbnails from "../../util/thumbnail";
import { receiveThumbnails, requestThumbnails, requestThumbnailsThenUpdate } from "../worker";

jest.mock("../../util/thumbnail");
(generateThumbnails as any).mockImplementation((photos: IPhoto[]) => {
  return photos.map((photo: IPhoto) => {
    return {
      ...photo,
      thumbnail: "thumbnail",
    };
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

  it("creates a receive thumbnails action", () => {
    const expected: IWorkerAction = {
      type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
      payload: {
        id: "123",
        photos: mockPhotosWithThumbnails,
      },
    };
    expect(receiveThumbnails("123", mockPhotosWithThumbnails)).toEqual(expected);
  });

  it("dispatches a request thumbnails action then waits to receive thumbnails", async () => {
    const expectedActions = [
      {
        type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
        payload: {
          id: "123",
        },
      }, {
        type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
        payload: {
          id: "123",
          photos: mockPhotosWithThumbnails,
        },
      },
    ];

    const store = mockStore({});
    await store.dispatch(requestThumbnailsThenUpdate("123", mockPhotosWithoutThumbnails));

    expect(generateThumbnails).toBeCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });
});
