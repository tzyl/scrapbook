import { IStoreEventsState } from "../types/events";
import { IAction } from "../types/redux";

const defaultState: IStoreEventsState = [];

const events = (state = defaultState, action: IAction): IStoreEventsState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default events;
