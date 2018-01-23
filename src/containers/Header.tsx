import * as React from "react";
import { connect } from "react-redux";

import { openEditor, setEditorMode } from "../actions/editor";
import Header, {
  IHeaderDispatchProps,
} from "../components/Header";
import { EditorMode } from "../types/editor";
import { Dispatch, IStoreState } from "../types/redux";

const mapDispatchToProps = (dispatch: Dispatch): IHeaderDispatchProps => {
  return {
    openEditor: () => dispatch(openEditor()),
    setEditorMode: (mode: EditorMode) => dispatch(setEditorMode(mode)),
  };
};

const ConnectedHeader = connect(null, mapDispatchToProps)(Header);

export default ConnectedHeader;
