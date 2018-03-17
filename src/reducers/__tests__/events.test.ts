import { EventsActionDefinitions, IEvent, IStoreEventsState } from "../../types/events";
import { IPhoto } from "../../types/gallery";
import { IAction } from "../../types/redux";
import { WorkerActionDefinitions } from "../../types/worker";
import events, { defaultState } from "../events";

describe("events reducer", () => {
  let mockState: IStoreEventsState;
  let mockEvent: IEvent;

  beforeEach(() => {
    mockEvent = {
      id: "123",
      title: "mock title",
      createdAt: "2018-01-01",
      icon: ":+1:",
      photos: [{ src: "src", width: 1, height: 1 }],
    };
    mockState = [mockEvent];
  });

  it("adds an event", () => {
    const mockEvent2: IEvent = {
      id: "123",
      title: "after",
      createdAt: "2018-02-03",
      icon: ":+1:",
      photos: [],
    };
    mockState = events(mockState, {
      type: EventsActionDefinitions.ADD_EVENT,
      payload: {
        event: mockEvent2,
      },
    });
    expect(mockState).toEqual([mockEvent, mockEvent2]);
  });

  it("adds events in sorted order", () => {
    const mockEventAfter: IEvent = {
      id: "123",
      title: "after",
      createdAt: "2018-02-03",
      icon: ":+1:",
      photos: [],
    };
    mockState = events(mockState, {
      type: EventsActionDefinitions.ADD_EVENT,
      payload: {
        event: mockEventAfter,
      },
    });
    expect(mockState).toEqual([mockEvent, mockEventAfter]);
    const mockEventBefore: IEvent = {
      id: "123",
      title: "before",
      createdAt: "2017-12-31",
      icon: ":+1:",
      photos: [],
    };
    mockState = events(mockState, {
      type: EventsActionDefinitions.ADD_EVENT,
      payload: {
        event: mockEventBefore,
      },
    });
    expect(mockState).toEqual([mockEventBefore, mockEvent, mockEventAfter]);
  });

  it("adds event with same createdAt date", () => {
    const mockEventEqual: IEvent = {
      id: "123",
      title: "equal",
      createdAt: "2018-01-01",
      icon: ":+1:",
      photos: [],
    };
    mockState = events(mockState, {
      type: EventsActionDefinitions.ADD_EVENT,
      payload: {
        event: mockEventEqual,
      },
    });
    expect(mockState).toEqual([mockEvent, mockEventEqual]);
  });

  it("removes events", () => {
    mockState = events(mockState, {
      type: EventsActionDefinitions.REMOVE_EVENT,
      payload: {
        id: mockEvent.id,
      },
    });
    expect(mockState).toEqual([]);
  });

  it("receives thumbnails for matching id", () => {
    const mockPhotosWithThumbnails: IPhoto[] = [
      {
        src: "src",
        width: 1,
        height: 1,
        thumbnail: "thumbnail",
      },
    ];
    mockState = events(mockState, {
      type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
      payload: {
        id: mockEvent.id,
        thumbnails: ["thumbnail"],
        startIndex: 0,
      },
    });
    expect(mockState[0].photos).toEqual(mockPhotosWithThumbnails);
  });

  it("doesn't change thumbnails for different id", () => {
    const mockPhotosWithThumbnails: IPhoto[] = [
      {
        src: "src",
        width: 1,
        height: 1,
        thumbnail: "thumbnail",
      },
    ];
    mockState = events(mockState, {
      type: WorkerActionDefinitions.RECEIVE_THUMBNAILS,
      payload: {
        id: "non-matching-id",
        thumbnails: ["thumbnail"],
        startIndex: 0,
      },
    });
    expect(mockState[0].photos).not.toEqual(mockPhotosWithThumbnails);
  });

  it("receives orientations for matching id", () => {
    const mockPhotosWithOrientations: IPhoto[] = [
      {
        src: "src",
        width: 1,
        height: 1,
        orientation: 1,
      },
    ];
    mockState = events(mockState, {
      type: WorkerActionDefinitions.RECEIVE_ORIENTATIONS,
      payload: {
        id: mockEvent.id,
        orientations: [1],
        startIndex: 0,
      },
    });
    expect(mockState[0].photos).toEqual(mockPhotosWithOrientations);
  });

  it("doesn't change orientations for different id", () => {
    const mockPhotosWithOrientations: IPhoto[] = [
      {
        src: "src",
        width: 1,
        height: 1,
        orientation: 1,
      },
    ];
    mockState = events(mockState, {
      type: WorkerActionDefinitions.RECEIVE_ORIENTATIONS,
      payload: {
        id: "non-matching-id",
        orientations: [1],
        startIndex: 0,
      },
    });
    expect(mockState[0].photos).not.toEqual(mockPhotosWithOrientations);
  });

  it("returns state for an unrecognized action", () => {
    expect(events(mockState, { type: null })).toBe(mockState);
  });

  it("returns default state if not initialized", () => {
    expect(events(undefined, { type: null })).toBe(defaultState);
  });
});
