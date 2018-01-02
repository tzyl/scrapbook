import { IAction } from "../constants/redux";
import { defaultStoreTimelineState, IStoreTimelineState } from "../constants/timeline";

const timeline = (state = defaultStoreTimelineState, action: IAction): IStoreTimelineState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default timeline;
