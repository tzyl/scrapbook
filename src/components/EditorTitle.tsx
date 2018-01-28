import * as React from "react";

import { Icon } from "@blueprintjs/core";

import { EditorMode } from "../types/editor";

export interface IEditorTitleProps {
  mode: EditorMode;
}

const EditorTitle: React.SFC<IEditorTitleProps> = ({mode}) => {
  return (
    <div className="editor-title-group">
      <Icon iconSize={20} iconName="pt-icon-timeline-events" />
      <h2>{getTitleText(mode)}</h2>
    </div>
  );
};

const getTitleText = (mode: EditorMode) => {
  if (mode === EditorMode.add) {
    return "Add event";
  }
  if (mode === EditorMode.edit) {
    return "Edit event";
  }
  return undefined;
};

export default EditorTitle;
