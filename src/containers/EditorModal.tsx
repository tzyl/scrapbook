import * as React from "react";
import { connect } from "react-redux";

import { closeEditor } from "../actions/editor";
import { addEvent, removeEvent } from "../actions/events";
import { requestThumbnailsThenUpdate } from "../actions/worker";
import EditorModal, {
  IDispatchProps,
  IStateProps,
} from "../components/EditorModal";
import { IScrapbookEvent, IScrapbookPhoto } from "../types/events";
import { Dispatch, IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IStateProps => {
  return {
    editorIsOpen: state.editor.editorIsOpen,
    mode: state.editor.mode,
    selectedEvent: state.timeline.selectedEvent,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    addEvent: (scrapbookEvent: IScrapbookEvent) => dispatch(addEvent(scrapbookEvent)),
    removeEvent: (id: string) => dispatch(removeEvent(id)),
    closeEditor: () => dispatch(closeEditor()),
    requestThumbnailsThenUpdate: (id: string, photos: IScrapbookPhoto[]) =>
      dispatch(requestThumbnailsThenUpdate(id, photos)),
  };
};

const ConnectedEditorModal = connect(mapStateToProps, mapDispatchToProps)(EditorModal);

export default ConnectedEditorModal;
