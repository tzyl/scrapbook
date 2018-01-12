import * as React from "react";
import { connect } from "react-redux";

import { openGallery } from "../actions/gallery";
import { selectEvent } from "../actions/timeline";
import ScrapbookTimeline, {
  IScrapbookTimelineDispatchProps,
  IScrapbookTimelineStateProps,
} from "../components/ScrapbookTimeline";
import { IScrapbookEvent } from "../types/events";
import { Dispatch } from "../types/redux";
import { IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IScrapbookTimelineStateProps => {
  return {
    events: state.events,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IScrapbookTimelineDispatchProps => {
  return {
    openEvent: (event: IScrapbookEvent) => () => {
      dispatch(selectEvent(event));
      dispatch(openGallery());
    },
  };
};

const ConnectedScrapbookTimeline = connect(mapStateToProps, mapDispatchToProps)(ScrapbookTimeline);

export default ConnectedScrapbookTimeline;
