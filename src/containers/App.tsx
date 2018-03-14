import * as React from "react";
import { connect } from "react-redux";

import { finishThumbnails, receiveThumbnails } from "../actions/worker";
import App, { IDispatchProps, IStateProps } from "../components/App";
import { IPhoto } from "../types/gallery";
import { Dispatch, IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IStateProps => {
  return {
    events: state.events,
    thumbnailRequests: state.worker.thumbnailRequests,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    finishThumbnails: (id: string) => dispatch(finishThumbnails(id)),
    receiveThumbnails: (id: string, photos: IPhoto[], startIndex: number) =>
      dispatch(receiveThumbnails(id, photos, startIndex)),
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
