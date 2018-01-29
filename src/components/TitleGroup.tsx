import * as React from "react";

import { Icon } from "@blueprintjs/core";

export interface ITitleGroupProps {
  text: React.ReactNode;
  iconName: string;
}

const TitleGroup: React.SFC<ITitleGroupProps> = ({
  text,
  iconName,
}) => {
  return (
    <div className="title-group">
      <Icon iconSize={20} iconName="pt-icon-timeline-events" />
      <h2>{text}</h2>
    </div>
  );
};

export default TitleGroup;
