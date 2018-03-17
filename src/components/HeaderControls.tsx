import * as React from "react";

import { Button } from "@blueprintjs/core";

import { EditorMode } from "../types/editor";
import LoadingSpinner from "./LoadingSpinner";

export interface IStateProps {
  isGeneratingThumbnails: boolean;
  isGettingOrientations: boolean;
}

export interface IDispatchProps {
  openEditor: () => any;
  setEditorMode: (mode: EditorMode) => any;
}

export type IHeaderControlsProps = IStateProps & IDispatchProps;

export default class HeaderControls extends React.PureComponent<IHeaderControlsProps> {
  public render() {
    return (
      <div>
        <Button className="pt-minimal" iconName="pt-icon-add" onClick={this.openEditorAdd}>Create new event</Button>
        <LoadingSpinner isLoading={this.isLoading()} text={this.renderLoadingText()} />
      </div>
    );
  }

  private openEditorAdd = () => {
    const { openEditor, setEditorMode } = this.props;
    setEditorMode(EditorMode.add);
    openEditor();
  }

  private isLoading = () => {
    const { isGeneratingThumbnails, isGettingOrientations } = this.props;
    return isGeneratingThumbnails || isGettingOrientations;
  }

  private renderLoadingText = () => {
    const { isGeneratingThumbnails, isGettingOrientations } = this.props;
    const texts = [];
    if (isGeneratingThumbnails) { texts.push("generating thumbnails"); }
    if (isGettingOrientations) { texts.push("getting orientations"); }
    const text = texts.join(", ");
    return text ? text[0].toUpperCase() + text.slice(1) : text;
   }
}
