declare module "react-event-timeline" {
  import * as React from "react";

  export interface ITimelineProps {
    children: React.ReactNode;
  }
  export interface ITimelineEventProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    createdAt?: React.ReactNode;
    children?: React.ReactNode;
    buttons?: React.ReactNode;
    container?: string;
    icon?: React.ReactNode;
    iconColor?: string;
    iconStyle?: object;
    bubbleStyle?: object;
    contentStyle?: object;
    cardHeaderStyle?: object;
    style?: object;
    titleStyle?: object;
    subtitleStyle?: object;
  }
  export interface ITimelineBlipProps {
    title: React.ReactNode;
    icon?: React.ReactNode;
    iconColor?: string;
    iconStyle?: object;
    style?: object;
  }

  export class Timeline extends React.Component<ITimelineProps> {}
  export class TimelineEvent extends React.Component<ITimelineEventProps> {}
  export class TimelineBlip extends React.Component<ITimelineEventProps> {}
}
