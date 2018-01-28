import * as React from "react";

import { Button, FormGroup, TextArea } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import * as moment from "moment";

import { EditorMode } from "../types/editor";
import { IScrapbookEvent } from "../types/events";
import EditorTitle from "./EditorTitle";

export interface IEditorOwnProps {
  mode: EditorMode;
  event: IScrapbookEvent;
  handleChange: (e: any) => any;
  handleDateChange: (e: any) => any;
  handleGetPhotos: () => any;
  handleAddPhoto: () => any;
  handleRemovePhoto: (sindex: number) => (e: any) => any;
  handlePhotoChange: (sindex: number, toInteger?: boolean) => (e: any) => any;
  handleSubmit: (e: any) => any;
}

export type IEditorProps = IEditorOwnProps;

export default class Editor extends React.Component<IEditorProps> {
  public render() {
    const {
      mode,
      event,
      handleChange,
      handleDateChange,
      handleSubmit,
    } = this.props;
    return (
      <div className="editor">
        <EditorTitle mode={mode} />
        <FormGroup
          label="Title"
          labelFor="title-input"
          requiredLabel={true}
        >
          <input
            className="pt-input"
            id="title-input"
            name="title"
            type="text"
            value={event.title}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup
          label="Date"
          requiredLabel={true}
        >
          <DateInput
            canClearSelection={false}
            format="YYYY-MM-DD"
            onChange={handleDateChange}
            value={moment(event.createdAt).toDate()}
          />
        </FormGroup>
        <FormGroup
          label="Subtitle"
          labelFor="subtitle-input"
        >
          <input
            className="pt-input"
            id="subtitle-input"
            name="subtitle"
            type="text"
            value={event.subtitle}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup
          label="Description"
          labelFor="description-input"
        >
          <TextArea
            id="description-input"
            name="description"
            fill={true}
            value={event.description}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup
          label="Photos"
        >
          {this.renderPhotoInputs()}
        </FormGroup>
        <Button onClick={handleSubmit}>Submit event</Button>
      </div>
    );
  }

  // TODO: Scrollable container
  private renderPhotoInputs() {
    const {
      event,
      handleGetPhotos,
      handleAddPhoto,
      handleRemovePhoto,
      handlePhotoChange,
    } = this.props;
    const photoInputs = event.photos.map((photo, index) => (
      <div key={index}>
        <input
          type="text"
          name="src"
          value={photo.src}
          onChange={handlePhotoChange(index)}
        />
        <input
          type="number"
          name="width"
          value={photo.width}
          onChange={handlePhotoChange(index, true)}
        />
        <input
          type="number"
          name="height"
          value={photo.height}
          onChange={handlePhotoChange(index, true)}
        />
        <Button iconName="pt-icon-remove" onClick={handleRemovePhoto(index)} />
      </div>
    ));
    return (
      <div>
        <Button onClick={handleAddPhoto}>Add Photo</Button>
        <Button onClick={handleGetPhotos}>Add from folder</Button>
        {photoInputs}
      </div>
    );
  }
}
