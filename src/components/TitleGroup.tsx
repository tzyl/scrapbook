import * as React from "react";

import { Icon, IconName } from "@blueprintjs/core";

export interface ITitleGroupProps {
  text: React.ReactNode;
  iconName: IconName;
}

const TitleGroup: React.SFC<ITitleGroupProps> = ({
  text,
  iconName,
}) => {
  return (
    <div className="title-group">
      <Icon iconSize={20} iconName={iconName} />
      <h2>{text}</h2>
    </div>
  );
};

export default TitleGroup;
