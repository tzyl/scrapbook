import * as React from "react";
import { connect } from "react-redux";

import { openEditor, setEditorMode } from "../actions/editor";
import { removeEvent } from "../actions/events";
import { openGallery, openLightbox, selectPhoto } from "../actions/gallery";
import { selectEvent } from "../actions/timeline";
import TimelinePage, {
  IDispatchProps,
  IStateProps,
} from "../components/TimelinePage";
import { EditorMode } from "../types/editor";
import { IEvent } from "../types/events";
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
    selectEvent: (event: IEvent) => dispatch(selectEvent(event)),
    openGallery: () => dispatch(openGallery()),
    openEditor: () => dispatch(openEditor()),
    setEditorMode: (mode: EditorMode) => dispatch(setEditorMode(mode)),
    removeEvent: (id: string) => dispatch(removeEvent(id)),
    openLightbox: (index: number) => {
      dispatch(selectPhoto(index));
      dispatch(openLightbox());
    },
  };
};

const ConnectedTimelinePage = connect(mapStateToProps, mapDispatchToProps)(TimelinePage);

export default ConnectedTimelinePage;
