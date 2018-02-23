import { IEvent } from "../../types/events";
import { ITimelineAction, TimelineActionDefinitions } from "../../types/timeline";
import { selectEvent } from "../timeline";

describe("timeline action creators", () => {
  it("creates a select event action", () => {
    const mockEvent: IEvent = {
      id: "123",
      title: "mock title",
      createdAt: "2018-01-01",
      icon: ":+1:",
      photos: [],
    };
    const expected: ITimelineAction = {
      type: TimelineActionDefinitions.SELECT_EVENT,
      payload: {
        event: mockEvent,
      },
    };
    expect(selectEvent(mockEvent)).toEqual(expected);
  });
});
