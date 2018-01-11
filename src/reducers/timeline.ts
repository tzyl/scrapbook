import { IAction } from "../types/redux";
import { IStoreTimelineState, TimelineActionDefinitions } from "../types/timeline";

const defaultState: IStoreTimelineState = {
  selectedEvent: null,
};

const timeline = (state = defaultState, action: IAction): IStoreTimelineState => {
  switch (action.type) {
    case TimelineActionDefinitions.SELECT_EVENT:
      return {
        ...state,
        selectedEvent: action.payload.event,
      };
    default:
      return state;
  }
};

export default timeline;
