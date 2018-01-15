import * as React from "react";

import { ITimelineEventProps, Timeline, TimelineEvent } from "react-event-timeline";
import { IGalleryProps } from "react-photo-gallery";

import Button from "../components/Button";
import { IScrapbookEvent } from "../types/events";

export interface ITimelinePageStateProps {
  events: IScrapbookEvent[];
}

export interface ITimelinePageDispatchProps {
  openEvent: (scrapbookEvent: IScrapbookEvent) => ((e: any) => any);
  openEditor: (e: any) => any;
}

export type ITimelinePageProps = ITimelinePageStateProps & ITimelinePageDispatchProps;

const TimelinePage: React.SFC<ITimelinePageProps> = (props) => {
  const { events, openEvent, openEditor } = props;

  const timelineEvents = events.map((event) => (
    <div key={event.id} onClick={openEvent(event)}>
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
    <div>
      <Timeline>
        {timelineEvents}
      </Timeline>
      <Button onClick={openEditor}>Create new event</Button>
    </div>
  );
};

export default TimelinePage;
