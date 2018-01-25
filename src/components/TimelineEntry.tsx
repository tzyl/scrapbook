import * as React from "react";

import { Alert, Button, Intent } from "@blueprintjs/core";
import { ITimelineEventProps, Timeline, TimelineEvent } from "react-event-timeline";

import { IScrapbookEvent } from "../types/events";
import ScrapbookToaster from "./ScrapbookToaster";

export interface ITimelineEntryProps {
  event: IScrapbookEvent;
  handleOpenEvent: (e: any) => any;
  handleDeleteEvent: (e: any) => any;
  handleOpenEditorEdit: (e: any) => any;
}

export interface ITimelineEntryState {
  isDeleteAlertOpen: boolean;
}

export default class TimelineEntry extends React.Component<ITimelineEntryProps, ITimelineEntryState> {
  public state: ITimelineEntryState = {
    isDeleteAlertOpen: false,
  };

  public render() {
    const { event, handleOpenEvent } = this.props;
    return (
      <div>
        <div className="timeline-event" onClick={handleOpenEvent}>
          <TimelineEvent
            title={event.title}
            subtitle={event.subtitle}
            createdAt={event.createdAt}
            icon={<i className="material-icons md-18">photo</i>}
            iconColor={"#03a9f4"}
            buttons={this.renderButtons()}
          >
            {event.description}
          </TimelineEvent>
        </div>
        {/* TODO: Refactor this into a single instance on TimelinePage */}
        <Alert
          isOpen={this.state.isDeleteAlertOpen}
          intent={Intent.PRIMARY}
          cancelButtonText="Cancel"
          onCancel={this.handleCancelDelete}
          onConfirm={this.handleConfirmDelete}
        >
          <p>Are you sure you want to delete the event <b>{event.title}</b>?</p>
        </Alert>
      </div>
    );
  }

  private renderButtons() {
    const { event, handleOpenEditorEdit } = this.props;
    return (
      <div>
        <Button className="pt-minimal" iconName="pt-icon-edit" onClick={handleOpenEditorEdit}>Edit</Button>
        <Button className="pt-minimal" iconName="pt-icon-delete" onClick={this.handleOpenDelete}>Delete</Button>
      </div>
    );
  }

  private handleOpenDelete = (e: any) => {
    e.stopPropagation();
    this.setState({
      isDeleteAlertOpen: true,
    });
  }

  private handleConfirmDelete = (e: any) => {
    const { event, handleDeleteEvent } = this.props;
    handleDeleteEvent(e);
    this.setState({
      isDeleteAlertOpen: false,
    });
    ScrapbookToaster.show({
      message: <span>Deleted event <b>${event.title}</b></span>,
      intent: Intent.PRIMARY,
    });
  }

  private handleCancelDelete = (e: any) => {
    this.setState({
      isDeleteAlertOpen: false,
    });
  }
}
