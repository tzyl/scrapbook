import { IStoreWorkerState, WorkerActionDefinitions } from "../../types/worker";
import worker, { defaultState } from "../worker";

describe("worker reducer", () => {
  let mockState: IStoreWorkerState;

  beforeEach(() => {
    mockState = {
      thumbnailRequests: ["123"],
      orientationRequests: ["123"],
    };
  });

  it("requests thumbnails", () => {
    mockState = worker(mockState, {
      type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
      payload: {
        id: "456",
      },
    });
    expect(mockState.thumbnailRequests).toEqual(["123", "456"]);
  });

  it("finishes thumbnails", () => {
    mockState = worker(mockState, {
      type: WorkerActionDefinitions.FINISH_THUMBNAILS,
      payload: {
        id: "123",
      },
    });
    expect(mockState.thumbnailRequests).toHaveLength(0);
  });

  it("requests orientation", () => {
    mockState = worker(mockState, {
      type: WorkerActionDefinitions.REQUEST_ORIENTATIONS,
      payload: {
        id: "456",
      },
    });
    expect(mockState.orientationRequests).toEqual(["123", "456"]);
  });

  it("finishes orientation", () => {
    mockState = worker(mockState, {
      type: WorkerActionDefinitions.FINISH_ORIENTATIONS,
      payload: {
        id: "123",
      },
    });
    expect(mockState.orientationRequests).toHaveLength(0);
  });

  it("returns state for an unrecognized action", () => {
    expect(worker(mockState, { type: null })).toBe(mockState);
  });

  it("returns default state if not initialized", () => {
    expect(worker(undefined, { type: null })).toBe(defaultState);
  });
});
