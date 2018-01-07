import * as React from "react";

import { ITimelineEventProps, Timeline, TimelineEvent } from "react-event-timeline";
import { IGalleryProps } from "react-photo-gallery";

export interface IScrapbookTimelineProps {
  events: ITimelineEvent[];
}

export interface ITimelineEvent {
  timelineEventProps: ITimelineEventProps;
  content: React.ReactNode;
}

const ScrapbookTimeline: React.SFC<IScrapbookTimelineProps> = (props) => {
  const timelineEvents = props.events.map((event, index) => (
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
};

export default ScrapbookTimeline;
