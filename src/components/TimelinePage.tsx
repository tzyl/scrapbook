import * as React from "react";

import { Timeline } from "react-event-timeline";

import { Alert, Intent } from "@blueprintjs/core";
import { EditorMode } from "../types/editor";
import { IScrapbookEvent } from "../types/events";
import ScrapbookToaster from "./ScrapbookToaster";
import TimelineEntry from "./TimelineEntry";

export interface ITimelinePageStateProps {
  events: IScrapbookEvent[];
  selectedEvent: IScrapbookEvent;
}

export interface ITimelinePageDispatchProps {
  selectEvent: (scrapbookEvent: IScrapbookEvent) => any;
  removeEvent: (id: string) => any;
  openGallery: () => any;
  openEditor: () => any;
  setEditorMode: (mode: EditorMode) => any;
}

export type ITimelinePageProps = ITimelinePageStateProps & ITimelinePageDispatchProps;

export interface ITimelinePageState {
  isDeleteAlertOpen: boolean;
}

export default class TimelinePage extends React.Component<ITimelinePageProps, ITimelinePageState> {
  public state: ITimelinePageState = {
    isDeleteAlertOpen: false,
  };

  public render() {
    const { selectedEvent } = this.props;
    return (
      <div>
        <Timeline>
          {this.renderTimelineEvents()}
        </Timeline>
        <Alert
          isOpen={this.state.isDeleteAlertOpen}
          intent={Intent.PRIMARY}
          cancelButtonText="Cancel"
          onCancel={this.handleCancelDelete}
          onConfirm={this.handleConfirmDelete(selectedEvent)}
        >
          <p>Are you sure you want to delete the event <b>{selectedEvent.title}</b>?</p>
        </Alert>
      </div>
    );
  }

  private renderTimelineEvents() {
    const { events } = this.props;
    return events.map((event) => (
      <TimelineEntry
        key={event.id}
        event={event}
        handleOpenEvent={this.handleOpenEvent(event)}
        handleOpenEditorEdit={this.handleOpenEditorEdit(event)}
        handleOpenDelete={this.handleOpenDelete(event)}
      />
    ));
  }

  private handleOpenEvent = (event: IScrapbookEvent) => (e: any) => {
    const { selectEvent, openGallery } = this.props;
    e.stopPropagation();
    selectEvent(event);
    openGallery();
  }

  private handleDeleteEvent = (event: IScrapbookEvent) => (e: any) => {
    const { removeEvent } = this.props;
    e.stopPropagation();
    removeEvent(event.id);
  }

  private handleOpenEditorEdit = (event: IScrapbookEvent) => (e: any) => {
    const { selectEvent, setEditorMode, openEditor } = this.props;
    e.stopPropagation();
    selectEvent(event);
    setEditorMode(EditorMode.edit);
    openEditor();
  }

  private handleOpenDelete = (event: IScrapbookEvent) => (e: any) => {
    const { selectEvent } = this.props;
    e.stopPropagation();
    selectEvent(event);
    this.setState({
      isDeleteAlertOpen: true,
    });
  }

  private handleConfirmDelete = (event: IScrapbookEvent) => (e: any) => {
    this.handleDeleteEvent(event)(e);
    this.setState({
      isDeleteAlertOpen: false,
    });
    ScrapbookToaster.show({
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
