import * as React from "react";

import { ITimelineEventProps, Timeline, TimelineEvent } from "react-event-timeline";
import { IGalleryProps } from "react-photo-gallery";
import { IScrapbookEvent } from "../types/events";

export interface ITimelinePageStateProps {
  events: IScrapbookEvent[];
}

export interface ITimelinePageDispatchProps {
  openEventCreator: (scrapbookEvent: IScrapbookEvent) => ((event: any) => any);
}

export type ITimelinePageProps = ITimelinePageStateProps & ITimelinePageDispatchProps;

const TimelinePage: React.SFC<ITimelinePageProps> = (props) => {
  const { events, openEventCreator } = props;

  const timelineEvents = events.map((event) => (
    <div key={event.id} onClick={openEventCreator(event)}>
      <TimelineEvent
        title={event.title}
        subtitle={event.subtitle}
        createdAt={event.createdAt}
        icon={<i className="material-icons md-18">photo</i>}
        iconColor={"#03a9f4"}
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

export default TimelinePage;
