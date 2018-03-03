import * as React from "react";

import { Alert, Intent } from "@blueprintjs/core";
import { EditorMode } from "../types/editor";
import { IEvent } from "../types/events";
import toaster from "../util/toaster";
import TimelineEvent from "./TimelineEvent";
import TimelineScroller from "./TimelineScroller";

export interface IStateProps {
  events: IEvent[];
  selectedEvent: IEvent;
}

export interface IDispatchProps {
  selectEvent: (event: IEvent) => any;
  removeEvent: (id: string) => any;
  openGallery: () => any;
  openEditor: () => any;
  setEditorMode: (mode: EditorMode) => any;
  openLightbox: (index: number) => any;
}

export type ITimelinePageProps = IStateProps & IDispatchProps;

export interface ITimelinePageState {
  isDeleteAlertOpen: boolean;
}

export default class TimelinePage extends React.PureComponent<ITimelinePageProps, ITimelinePageState> {
  public state: ITimelinePageState = {
    isDeleteAlertOpen: false,
  };

  public render() {
    const { events, selectedEvent } = this.props;
    return (
      <div className="timeline-page">
        <TimelineScroller events={events} />
        <div className="timeline">
          <div className="timeline-stripe" />
          {this.renderTimelineEvents()}
        </div>
        <Alert
          isOpen={this.state.isDeleteAlertOpen}
          intent={Intent.PRIMARY}
          cancelButtonText="Cancel"
          onCancel={this.handleCancelDelete}
          onConfirm={this.handleConfirmDelete(selectedEvent)}
        >
          <p>Are you sure you want to delete the event <b>{selectedEvent && selectedEvent.title}</b>?</p>
        </Alert>
      </div>
    );
  }

  private renderTimelineEvents() {
    const { events, openLightbox } = this.props;
    return events.map((event) => (
      <TimelineEvent
        key={event.id}
        event={event}
        handleOpenEvent={this.handleOpenEvent(event)}
        handleOpenEditorEdit={this.handleOpenEditorEdit(event)}
        handleOpenDelete={this.handleOpenDelete(event)}
        openLightbox={openLightbox}
      />
    ));
  }

  private handleOpenEvent = (event: IEvent) => (e: any) => {
    const { selectEvent, openGallery } = this.props;
    e.stopPropagation();
    selectEvent(event);
    openGallery();
  }

  private handleDeleteEvent = (event: IEvent) => (e: any) => {
    const { removeEvent } = this.props;
    e.stopPropagation();
    removeEvent(event.id);
  }

  private handleOpenEditorEdit = (event: IEvent) => (e: any) => {
    const { selectEvent, setEditorMode, openEditor } = this.props;
    e.stopPropagation();
    selectEvent(event);
    setEditorMode(EditorMode.edit);
    openEditor();
  }

  private handleOpenDelete = (event: IEvent) => (e: any) => {
    const { selectEvent } = this.props;
    e.stopPropagation();
    selectEvent(event);
    this.setState({
      isDeleteAlertOpen: true,
    });
  }

  private handleConfirmDelete = (event: IEvent) => (e: any) => {
    this.handleDeleteEvent(event)(e);
    this.setState({
      isDeleteAlertOpen: false,
    });
    toaster.show({
      message: <span>Deleted event: <b>{event.title}</b></span>,
      intent: Intent.PRIMARY,
    });
  }

  private handleCancelDelete = (e: any) => {
    this.setState({
      isDeleteAlertOpen: false,
    });
  }
}
