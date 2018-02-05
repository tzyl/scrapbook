import * as React from "react";
import { connect } from "react-redux";

import { openEditor, setEditorMode } from "../actions/editor";
import HeaderControls, {
  IDispatchProps, IStateProps,
} from "../components/HeaderControls";
import { EditorMode } from "../types/editor";
import { Dispatch, IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IStateProps => {
  return {
    isGeneratingThumbnails: state.worker.requests.length > 0,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    openEditor: () => dispatch(openEditor()),
    setEditorMode: (mode: EditorMode) => dispatch(setEditorMode(mode)),
  };
};

const ConnectedHeaderControls = connect(mapStateToProps, mapDispatchToProps)(HeaderControls);

export default ConnectedHeaderControls;
