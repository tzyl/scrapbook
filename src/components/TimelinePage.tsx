import * as React from "react";

import { Button } from "@blueprintjs/core";
import { ITimelineEventProps, Timeline, TimelineEvent } from "react-event-timeline";
import { IGalleryProps } from "react-photo-gallery";

import { EditorMode } from "../types/editor";
import { IScrapbookEvent } from "../types/events";

export interface ITimelinePageStateProps {
  events: IScrapbookEvent[];
}

export interface ITimelinePageDispatchProps {
  selectEvent: (scrapbookEvent: IScrapbookEvent) => any;
  removeEvent: (id: string) => any;
  openGallery: () => any;
  openEditor: () => any;
  setEditorMode: (mode: EditorMode) => any;
}

export type ITimelinePageProps = ITimelinePageStateProps & ITimelinePageDispatchProps;

const TimelinePage: React.SFC<ITimelinePageProps> = ({
  events,
  selectEvent,
  removeEvent,
  openGallery,
  openEditor,
  setEditorMode,
}) => {
  const openEvent = (event: IScrapbookEvent) => (e: any) => {
    e.stopPropagation();
    selectEvent(event);
    openGallery();
  };

  const deleteEvent = (event: IScrapbookEvent) => (e: any) => {
    e.stopPropagation();
    removeEvent(event.id);
  };

  const openEditorEdit = (event: IScrapbookEvent) => (e: any) => {
    e.stopPropagation();
    selectEvent(event);
    setEditorMode(EditorMode.edit);
    openEditor();
  };

  const timelineEvents = events.map((event) => {
    const buttons = (
      <div>
        <Button className="pt-minimal" iconName="pt-icon-edit" onClick={openEditorEdit(event)}>Edit</Button>
        <Button className="pt-minimal" iconName="pt-icon-delete" onClick={deleteEvent(event)}>Delete</Button>
      </div>
    );
    return (
      <div className="timeline-event" key={event.id} onClick={openEvent(event)}>
        <TimelineEvent
          title={event.title}
          subtitle={event.subtitle}
          createdAt={event.createdAt}
          icon={<i className="material-icons md-18">photo</i>}
          iconColor={"#03a9f4"}
          buttons={buttons}
        >
          {event.description}
        </TimelineEvent>
      </div>
    );
  });
  return (
    <div>
      <Timeline>
        {timelineEvents}
      </Timeline>
    </div>
  );
};

export default TimelinePage;
