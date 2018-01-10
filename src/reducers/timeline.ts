import { IAction } from "../types/redux";
import { IStoreTimelineState, TimelineActionDefinitions } from "../types/timeline";

const defaultState: IStoreTimelineState = {
  selectedEventIndex: null,
};

const timeline = (state = defaultState, action: IAction): IStoreTimelineState => {
  switch (action.type) {
    case TimelineActionDefinitions.SELECT_EVENT:
      return {
        ...state,
        selectedEventIndex: action.payload.index,
      };
    default:
      return state;
  }
};

export default timeline;
