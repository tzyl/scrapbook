import * as React from "react";

import { Slider } from "@blueprintjs/core";
import * as _ from "lodash";
import * as Scroll from "react-scroll";

import { IEvent } from "../types/events";

export interface ITimelineScrollerProps {
  events: IEvent[];
}

export interface ITimelineScrollerState {
  index: number;
}

const OFFSET = -300;

export default class TimelineScroller extends React.PureComponent<ITimelineScrollerProps> {
  public state: ITimelineScrollerState = {
    index: 0,
  };

  public constructor(props: ITimelineScrollerProps) {
    super(props);
    this.handleScroll = _.throttle(this.handleScroll, 200);
  }

  public render() {
    const length = this.props.events.length;
    return (
      <div className="timeline-scroller">
        <Slider
          vertical={true}
          labelRenderer={this.renderLabel}
          labelStepSize={length - 1}
          initialValue={length - 1}
          min={0}
          max={length - 1}
          onChange={this.handleScroll}
          value={this.state.index}
        />
        {this.renderLinks()}
      </div>
    );
  }

  private renderLinks = () => {
    const { events } = this.props;
    const links = events.map((event, index) => {
      return (
        <Scroll.Link
          key={event.id}
          to={event.id}
          spy={true}
          onSetActive={this.getActiveHandler(index)}
          offset={OFFSET}
        />
      );
    });
    return links;
  }

  private getActiveHandler = (index: number) => () => {
    this.handleChange(index);
  }

  private renderLabel = (index: number) => {
    // Reverse to have slider top to bottom.
    const reversedIndex = this.props.events.length - 1 - index;
    const { events } = this.props;
    return events[reversedIndex].createdAt;
  }

  private handleChange = (index: number) => {
    // Reverse to have slider top to bottom.
    const reversedIndex = this.props.events.length - 1 - index;
    this.setState({
      index: reversedIndex,
    });
  }

  private handleScroll = (index: number) => {
    // Reverse to have slider top to bottom.
    const reversedIndex = this.props.events.length - 1 - index;
    const { events } = this.props;
    Scroll.scroller.scrollTo(events[reversedIndex].id, {
      duration: 200,
      smooth: true,
      offset: OFFSET,
    });
  }
}
