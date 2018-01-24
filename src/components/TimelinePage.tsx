import * as React from "react";

import { Timeline } from "react-event-timeline";

import { EditorMode } from "../types/editor";
import { IScrapbookEvent } from "../types/events";
import TimelineEntry from "./TimelineEntry";

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

export default class TimelinePage extends React.Component<ITimelinePageProps> {

  public render() {
    return (
      <div>
        <Timeline>
          {this.renderTimelineEvents()}
        </Timeline>
      </div>
    );
  }

  private renderTimelineEvents() {
    const { events } = this.props;
    return events.map((event) => (
      <TimelineEntry
        key={event.id}
        event={event}
        handleOpenEvent={this.openEvent(event)}
        handleDeleteEvent={this.deleteEvent(event)}
        handleOpenEditorEdit={this.openEditorEdit(event)}
      />
    ));
  }

  private openEvent = (event: IScrapbookEvent) => (e: any) => {
    const { selectEvent, openGallery } = this.props;
    e.stopPropagation();
    selectEvent(event);
    openGallery();
  }

  private deleteEvent = (event: IScrapbookEvent) => (e: any) => {
    const { removeEvent } = this.props;
    e.stopPropagation();
    removeEvent(event.id);
  }

  private openEditorEdit = (event: IScrapbookEvent) => (e: any) => {
    const { selectEvent, setEditorMode, openEditor } = this.props;
    e.stopPropagation();
    selectEvent(event);
    setEditorMode(EditorMode.edit);
    openEditor();
  }
}
