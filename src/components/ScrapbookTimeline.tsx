import * as React from "react";

import { Timeline, TimelineEvent } from "react-event-timeline";

export interface IScrapbookTimelineProps {
  events: IEvent[];
}

export interface IEvent {
  title: string;
  createdAt: string;
  icon: JSX.Element;
  iconColor: string;
  content: JSX.Element;
}

export class ScrapbookTimeline extends React.Component<IScrapbookTimelineProps> {
  public render() {
    const timelineEvents = this.props.events.map((event) => (
      <TimelineEvent
        key={event.title + event.createdAt}
        {...event}
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
