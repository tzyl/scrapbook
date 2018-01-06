import * as React from "react";

import { ITimelineEventProps, Timeline, TimelineEvent } from "react-event-timeline";
import { Gallery, IGalleryProps } from "react-photo-gallery";

export interface IScrapbookTimelineProps {
  events: ITimelineEvent[];
}

export interface ITimelineEvent {
  timelineEventProps: ITimelineEventProps;
  photoGalleryProps: IGalleryProps;
  content: React.ReactNode;
}

export class ScrapbookTimeline extends React.Component<IScrapbookTimelineProps> {
  public render() {
    const timelineEvents = this.props.events.map((event, index) => (
      <TimelineEvent
        key={index}
        {...event.timelineEventProps}
      >
        {event.content}
      </TimelineEvent>
    ));
    return (
      <Timeline>
        {timelineEvents}
      </Timeline>
    );
  }
}
