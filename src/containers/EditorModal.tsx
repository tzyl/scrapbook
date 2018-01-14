import * as React from "react";
import { connect } from "react-redux";

import {
  closeEditor,
} from "../actions/editor";
import EditorModal, {
  IEditorModalDispatchProps,
  IEditorModalStateProps,
} from "../components/EditorModal";
import { Dispatch, IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IEditorModalStateProps => {
  return {
    editorIsOpen: state.editor.editorIsOpen,
    mode: state.editor.mode,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IEditorModalDispatchProps => {
  return {
    // TODO: Finish submitEvent with correct mode behaviour.
    submitEvent: () => null,
    closeEditor: () => dispatch(closeEditor()),
  };
};

const ConnectedEditorModal = connect(mapStateToProps, mapDispatchToProps)(EditorModal);

export default ConnectedEditorModal;
