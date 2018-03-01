import { IStoreWorkerState, WorkerActionDefinitions } from "../../types/worker";
import worker, { defaultState } from "../worker";

describe("worker reducer", () => {
  let mockState: IStoreWorkerState;

  beforeEach(() => {
    mockState = {
      requests: ["123"],
    };
  });

  it("requests thumbnails", () => {
    mockState = worker(mockState, {
      type: WorkerActionDefinitions.REQUEST_THUMBNAILS,
      payload: {
        id: "456",
      },
    });
    expect(mockState.requests).toEqual(["123", "456"]);
  });

  it("finishes thumbnails", () => {
    mockState = worker(mockState, {
      type: WorkerActionDefinitions.FINISH_THUMBNAILS,
      payload: {
        id: "123",
      },
    });
    expect(mockState.requests).toHaveLength(0);
  });

  it("returns state for an unrecognized action", () => {
    expect(worker(mockState, { type: null })).toBe(mockState);
  });

  it("returns default state if not initialized", () => {
    expect(worker(undefined, { type: null })).toBe(defaultState);
  });
});
