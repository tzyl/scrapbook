import * as React from "react";

import { Button } from "@blueprintjs/core";

import { EditorMode } from "../types/editor";
import LoadingSpinner from "./LoadingSpinner";

export interface IStateProps {
  isGeneratingThumbnails: boolean;
}

export interface IDispatchProps {
  openEditor: () => any;
  setEditorMode: (mode: EditorMode) => any;
}

export type IHeaderControlsProps = IStateProps & IDispatchProps;

const HeaderControls: React.SFC<IHeaderControlsProps> = ({
  openEditor,
  setEditorMode,
  isGeneratingThumbnails,
}) => {
  const openEditorAdd = () => {
    setEditorMode(EditorMode.add);
    openEditor();
  };
  return (
    <div>
      <Button className="pt-minimal" iconName="pt-icon-add" onClick={openEditorAdd}>Create new event</Button>
      <LoadingSpinner isLoading={isGeneratingThumbnails} text="Generating thumbnails" />
    </div>
  );
};

export default HeaderControls;
