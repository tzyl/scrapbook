import * as React from "react";
import { connect } from "react-redux";

import {
  finishOrientations,
  finishThumbnails,
  receiveOrientations,
  receiveThumbnails,
} from "../actions/worker";
import App, { IDispatchProps, IStateProps } from "../components/App";
import { IPhoto, PhotoOrientation } from "../types/gallery";
import { Dispatch, IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IStateProps => {
  return {
    events: state.events,
    thumbnailRequests: state.worker.thumbnailRequests,
    orientationRequests: state.worker.orientationRequests,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    finishThumbnails: (id: string) => dispatch(finishThumbnails(id)),
    receiveThumbnails: (id: string, thumbnails: string[], startIndex: number) =>
      dispatch(receiveThumbnails(id, thumbnails, startIndex)),
    finishOrientations: (id: string) => dispatch(finishOrientations(id)),
    receiveOrientations: (id: string, orientations: PhotoOrientation[], startIndex: number) =>
      dispatch(receiveOrientations(id, orientations, startIndex)),
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
