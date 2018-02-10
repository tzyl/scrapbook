import * as React from "react";

import { Button } from "@blueprintjs/core";
import { Emoji } from "emoji-mart";
import { ITimelineEventProps, Timeline, TimelineEvent } from "react-event-timeline";
import ReactPhotoGallery, { IPhotoObject } from "react-photo-gallery";

import { IScrapbookEvent } from "../types/events";
import Thumbnail from "./Thumbnail";

export interface ITimelineEntryProps {
  event: IScrapbookEvent;
  handleOpenEvent: (e: any) => any;
  handleOpenEditorEdit: (e: any) => any;
  handleOpenDelete: (e: any) => any;
  openLightbox: (e: any, photoObject: IPhotoObject) => any;
}

export default class TimelineEntry extends React.Component<ITimelineEntryProps> {
  public render() {
    const { event, handleOpenEvent, openLightbox } = this.props;
    return (
      <div className="timeline-event" onClick={handleOpenEvent}>
        <TimelineEvent
          title={event.title}
          subtitle={event.subtitle}
          createdAt={event.createdAt}
          icon={<Emoji emoji={event.icon} size={18} />}
          buttons={this.renderButtons()}
        >
          {event.description}
          <ReactPhotoGallery
            ImageComponent={Thumbnail}
            photos={event.photos.slice(0, 3)}
            onClick={openLightbox}
            margin={2}
            columns={6}
          />
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
