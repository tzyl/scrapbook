import * as React from "react";
import { connect } from "react-redux";

import { closeEditor } from "../actions/editor";
import { addEvent, removeEvent } from "../actions/events";
import EditorModal, {
  IEditorModalDispatchProps,
  IEditorModalStateProps,
} from "../components/EditorModal";
import { IScrapbookEvent } from "../types/events";
import { Dispatch, IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IEditorModalStateProps => {
  return {
    editorIsOpen: state.editor.editorIsOpen,
    mode: state.editor.mode,
    selectedEvent: state.timeline.selectedEvent,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IEditorModalDispatchProps => {
  return {
    addEvent: (scrapbookEvent: IScrapbookEvent) => dispatch(addEvent(scrapbookEvent)),
    removeEvent: (id: string) => dispatch(removeEvent(id)),
    closeEditor: () => dispatch(closeEditor()),
  };
};

const ConnectedEditorModal = connect(mapStateToProps, mapDispatchToProps)(EditorModal);

export default ConnectedEditorModal;
