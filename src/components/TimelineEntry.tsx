import * as React from "react";

import { Button } from "@blueprintjs/core";
import { Emoji } from "emoji-mart";

import { IEvent } from "../types/events";
import Gallery from "./Gallery";
import Thumbnail from "./Thumbnail";

export interface ITimelineEntryProps {
  event: IEvent;
  handleOpenEvent: (e: any) => any;
  handleOpenEditorEdit: (e: any) => any;
  handleOpenDelete: (e: any) => any;
  openLightbox: (index: number) => any;
}

export default class TimelineEntry extends React.Component<ITimelineEntryProps> {
  public render() {
    const { event, handleOpenEvent, openLightbox } = this.props;
    return (
      <div className="pt-card timeline-event" onClick={handleOpenEvent}>
        {this.renderIcon()}
        {this.renderHeading()}
        {this.renderDescription()}
        <Gallery photos={event.photos.slice(0, 3)} openLightbox={openLightbox} />
      </div>
    );
  }

  private renderHeading() {
    const { event } = this.props;
    return (
      <div className="timeline-event-heading">
        <div className="timeline-event-heading-label">
          <span className="timeline-event-heading-title">{event.title}</span>
          <span className="timeline-event-heading-date">{event.createdAt}</span>
        </div>
        {this.renderButtons()}
      </div>
    );
  }

  private renderButtons() {
    const { event, handleOpenEditorEdit, handleOpenDelete } = this.props;
    return (
      <div className="timeline-event-buttons">
        <Button className="pt-minimal" iconName="pt-icon-edit" onClick={handleOpenEditorEdit}>Edit</Button>
        <Button className="pt-minimal" iconName="pt-icon-delete" onClick={handleOpenDelete}>Delete</Button>
      </div>
    );
  }

  private renderIcon() {
    const { event } = this.props;
    return (
      <div className="timeline-event-icon">
        <Emoji emoji={event.icon} size={18} />
      </div>
    );
  }

  private renderDescription() {
    const { event } = this.props;
    return (
      <div className="timeline-event-description">
        {event.description}
      </div>
    );
  }
}
