import * as React from "react";

import { ITimelineEventProps, Timeline, TimelineEvent } from "react-event-timeline";
import { IGalleryProps } from "react-photo-gallery";
import { IScrapbookEvent } from "../types/events";

export interface IScrapbookTimelineStateProps {
  events: IScrapbookEvent[];
}

export interface IScrapbookTimelineDispatchProps {
  openEvent: (scrapbookEvent: IScrapbookEvent) => ((event: any) => any);
}

export type IScrapbookTimelineProps = IScrapbookTimelineStateProps & IScrapbookTimelineDispatchProps;

const ScrapbookTimeline: React.SFC<IScrapbookTimelineProps> = (props) => {
  const { events, openEvent } = props;

  const timelineEvents = events.map((event) => (
    <div key={event.id} onClick={openEvent(event)}>
      <TimelineEvent
        title={event.title}
        subtitle={event.subtitle}
        createdAt={event.createdAt}
      >
        {event.description}
      </TimelineEvent>
    </div>
  ));
  return (
    <Timeline>
      {timelineEvents}
    </Timeline>
  );
};

export default ScrapbookTimeline;
