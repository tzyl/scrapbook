import * as React from "react";

import { Button } from "@blueprintjs/core";
import { EditorMode } from "../types/editor";

export interface IHeaderControlsDispatchProps {
  openEditor: () => any;
  setEditorMode: (mode: EditorMode) => any;
}

export type IHeaderControlsProps = IHeaderControlsDispatchProps;

const HeaderControls: React.SFC<IHeaderControlsProps> = ({
  openEditor,
  setEditorMode,
}) => {
  const openEditorAdd = () => {
    setEditorMode(EditorMode.add);
    openEditor();
  };
  return (
    <Button className="pt-minimal" iconName="pt-icon-add" onClick={openEditorAdd}>Create new event</Button>
  );
};

export default HeaderControls;
