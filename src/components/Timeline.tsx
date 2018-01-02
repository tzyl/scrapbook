import * as React from "react";
import HorizontalTimeline from "react-horizontal-timeline";

export interface ITimelineProps {
  // Required properties
  values: string[];
  indexClick: (i: number) => any;
  index: number;
  // Optional properties
  getLabel?: (d: Date) => string;
  minEventPadding?: number;
  maxEventPadding?: number;
  linePadding?: number;
  labelWidth?: number;
  fillingMotion?: IMotion;
  slidingMotion?: IMotion;
  stlyes?: object;
  isTouchEnabled?: boolean;
  isKeyboardEnabled?: boolean;
  isOpenBeginning?: boolean;
  isOpenEnd?: boolean;
}

export interface IMotion {
  stiffness: number;
  damping: number;
}

export class Timeline extends React.Component<ITimelineProps> {
  public render() {
    return (
      <HorizontalTimeline
        // Required properties
        values={this.props.values}
        indexClick={this.props.indexClick}
        index={this.props.index}
        // Optional properties
        getLabel={this.props.getLabel}
        minEventPadding={this.props.minEventPadding}
        maxEventPadding={this.props.maxEventPadding}
        linePadding={this.props.linePadding}
        labelWidth={this.props.labelWidth}
        fillingMotion={this.props.fillingMotion}
        slidingMotion={this.props.slidingMotion}
        stlyes={this.props.stlyes}
        isTouchEnabled={this.props.isTouchEnabled}
        isKeyboardEnabled={this.props.isKeyboardEnabled}
        isOpenBeginning={this.props.isOpenBeginning}
        isOpenEnd={this.props.isOpenEnd}
      />
    );
  }
}
