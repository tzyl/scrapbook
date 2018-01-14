import * as React from "react";
import { connect } from "react-redux";

import { openGallery } from "../actions/gallery";
import { selectEvent } from "../actions/timeline";
import TimelinePage, {
  ITimelinePageDispatchProps,
  ITimelinePageStateProps,
} from "../components/TimelinePage";
import { IScrapbookEvent } from "../types/events";
import { Dispatch } from "../types/redux";
import { IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): ITimelinePageStateProps => {
  return {
    events: state.events,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ITimelinePageDispatchProps => {
  return {
    openEventCreator: (event: IScrapbookEvent) => () => {
      dispatch(selectEvent(event));
      dispatch(openGallery());
    },
  };
};

const ConnectedTimelinePage = connect(mapStateToProps, mapDispatchToProps)(TimelinePage);

export default ConnectedTimelinePage;
