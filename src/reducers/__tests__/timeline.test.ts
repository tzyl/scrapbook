import { IEvent } from "../../types/events";
import { IPhoto } from "../../types/gallery";
import { IAction } from "../../types/redux";
import { IStoreTimelineState, TimelineActionDefinitions } from "../../types/timeline";
import { WorkerActionDefinitions } from "../../types/worker";
import timeline, { defaultState } from "../timeline";

describe("timeline reducer", () => {
  let mockState: IStoreTimelineState;

  beforeEach(() => {
    mockState = {
      selectedEvent: {
        id: "123",
        title: "mock title",
        createdAt: "2018-01-01",
        icon: ":+1:",
        photos: [{ src: "src", width: 1, height: 1 }],
      },
    };
  });

  it("selects an event", () => {
    const mockEvent: IEvent = {
        id: "select-event-id",
        title: "selected event",
        createdAt: "2000-00-00",
        icon: ":rocket:",
        photos: [],
    };
    const mockAction: IAction = {
      type: TimelineActionDefinitions.SELECT_EVENT,
      payload: {
        event: mockEvent,
      },
    };
    const expected: IStoreTimelineState = {
      ...mockState,
      selectedEvent: mockEvent,
    };
    expect(timeline(mockState, mockAction)).toEqual(expected);
  });

  it("receives thumbnails for the selected event", () => {
    const mockPhotosWithThumbnails: IPhoto[] = [
      {
        src: "src",
        width: 1,
        height: 1,
        thumbnail: "thumbnail",
      },
    ];
    mockState = timeline(mockState, {
      type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
      payload: {
        id: mockState.selectedEvent.id,
        thumbnails: ["thumbnail"],
        startIndex: 0,
      },
    });
    expect(mockState.selectedEvent.photos).toEqual(mockPhotosWithThumbnails);
  });

  it("doesn't receive thumbnails from a different event", () => {
    const mockPhotosWithThumbnails: IPhoto[] = [
      {
        src: "src",
        width: 1,
        height: 1,
        thumbnail: "thumbnail",
      },
    ];
    mockState = timeline(mockState, {
      type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
      payload: {
        id: "non-matching-id",
        thumbnails: ["thumbnail"],
        startIndex: 0,
      },
    });
    expect(mockState.selectedEvent.photos).not.toEqual(mockPhotosWithThumbnails);
  });

  it("receives orientations for the selected event", () => {
    const mockPhotosWithOrientations: IPhoto[] = [
      {
        src: "src",
        width: 1,
        height: 1,
        orientation: 1,
      },
    ];
    mockState = timeline(mockState, {
      type: WorkerActionDefinitions.RECEIVE_ORIENTATIONS,
      payload: {
        id: mockState.selectedEvent.id,
        orientations: [1],
        startIndex: 0,
      },
    });
    expect(mockState.selectedEvent.photos).toEqual(mockPhotosWithOrientations);
  });

  it("doesn't receive orientations from a different event", () => {
    const mockPhotosWithOrientations: IPhoto[] = [
      {
        src: "src",
        width: 1,
        height: 1,
        orientation: 1,
      },
    ];
    mockState = timeline(mockState, {
      type: WorkerActionDefinitions.RECEIVE_ORIENTATIONS,
      payload: {
        id: "non-matching-id",
        orientations: [1],
        startIndex: 0,
      },
    });
    expect(mockState.selectedEvent.photos).not.toEqual(mockPhotosWithOrientations);
  });

  it("returns state for an unrecognized action", () => {
    expect(timeline(mockState, { type: null })).toBe(mockState);
  });

  it("returns default state if not initialized", () => {
    expect(timeline(undefined, { type: null })).toBe(defaultState);
  });
});
