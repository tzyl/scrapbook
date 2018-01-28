import * as React from "react";

import { Icon } from "@blueprintjs/core";

const GalleryTitle: React.SFC<{}> = () => {
  return (
    <div className="gallery-title-group">
      <Icon iconSize={20} iconName="pt-icon-media" />
      <h2>Gallery</h2>
    </div>
  );
};

export default GalleryTitle;
