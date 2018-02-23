import { EventsActionDefinitions, IEvent, IEventsAction } from "../../types/events";
import { addEvent, removeEvent } from "../events";

describe("events action creators", () => {
  it("creates an add event action", () => {
    const mockEvent: IEvent = {
      id: "123",
      title: "mock title",
      createdAt: "2018-01-01",
      icon: ":+1:",
      photos: [],
    };
    const expected: IEventsAction = {
      type: EventsActionDefinitions.ADD_EVENT,
      payload: {
        event: mockEvent,
      },
    };
    expect(addEvent(mockEvent)).toEqual(expected);
  });

  it("creates a remove event action", () => {
    const expected: IEventsAction = {
      type: EventsActionDefinitions.REMOVE_EVENT,
      payload: {
        id: "123",
      },
    };
    expect(removeEvent("123")).toEqual(expected);
  });
});
