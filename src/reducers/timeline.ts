import { IAction } from "../types/redux";
import { IStoreTimelineState } from "../types/timeline";

const defaultState: IStoreTimelineState = {
  events: [],
  selectedIndex: null,
};

const timeline = (state = defaultState, action: IAction): IStoreTimelineState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default timeline;
