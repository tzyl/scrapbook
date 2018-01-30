import * as React from "react";

import { Button } from "@blueprintjs/core";
import { ITimelineEventProps, Timeline, TimelineEvent } from "react-event-timeline";

import { IScrapbookEvent } from "../types/events";

export interface ITimelineEntryProps {
  event: IScrapbookEvent;
  handleOpenEvent: (e: any) => any;
  handleOpenEditorEdit: (e: any) => any;
  handleOpenDelete: (e: any) => any;
}

export default class TimelineEntry extends React.Component<ITimelineEntryProps> {
  public render() {
    const { event, handleOpenEvent } = this.props;
    return (
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
    );
  }

  private renderButtons() {
    const { event, handleOpenEditorEdit, handleOpenDelete } = this.props;
    return (
      <div>
        <Button className="pt-minimal" iconName="pt-icon-edit" onClick={handleOpenEditorEdit}>Edit</Button>
        <Button className="pt-minimal" iconName="pt-icon-delete" onClick={handleOpenDelete}>Delete</Button>
      </div>
    );
  }
}
