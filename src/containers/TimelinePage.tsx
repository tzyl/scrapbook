import * as React from "react";
import { connect } from "react-redux";

import { openEditor, setEditorMode } from "../actions/editor";
import { removeEvent } from "../actions/events";
import { openGallery } from "../actions/gallery";
import { selectEvent } from "../actions/timeline";
import TimelinePage, {
  IDispatchProps,
  IStateProps,
} from "../components/TimelinePage";
import { EditorMode } from "../types/editor";
import { IScrapbookEvent } from "../types/events";
import { Dispatch } from "../types/redux";
import { IStoreState } from "../types/redux";

const mapStateToProps = (state: IStoreState): IStateProps => {
  return {
    events: state.events,
    selectedEvent: state.timeline.selectedEvent,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    selectEvent: (event: IScrapbookEvent) => dispatch(selectEvent(event)),
    openGallery: () => dispatch(openGallery()),
    openEditor: () => dispatch(openEditor()),
    setEditorMode: (mode: EditorMode) => dispatch(setEditorMode(mode)),
    removeEvent: (id: string) => dispatch(removeEvent(id)),
  };
};

const ConnectedTimelinePage = connect(mapStateToProps, mapDispatchToProps)(TimelinePage);

export default ConnectedTimelinePage;
