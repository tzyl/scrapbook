import * as React from "react";

import { ITimelineEventProps, Timeline, TimelineEvent } from "react-event-timeline";
import { IGalleryProps } from "react-photo-gallery";
import { IScrapbookEvent } from "../types/events";

export interface IScrapbookTimelineProps {
  events: IScrapbookEvent[];
}

const ScrapbookTimeline: React.SFC<IScrapbookTimelineProps> = (props) => {
  const timelineEvents = props.events.map((event) => (
    <TimelineEvent
      key={event.id}
      title={event.title}
      subtitle={event.subtitle}
      createdAt={event.createdAt}
    >
      {event.description}
    </TimelineEvent>
  ));
  return (
    <Timeline>
      {timelineEvents}
    </Timeline>
  );
};

export default ScrapbookTimeline;
