import * as React from "react";

import { Button, FormGroup, Popover, Position, TextArea } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Emoji, EmojiData, Picker } from "emoji-mart";
import * as moment from "moment";

import { EditorMode } from "../types/editor";
import { IEvent } from "../types/events";
import TitleGroup from "./TitleGroup";

export interface IEditorProps {
  mode: EditorMode;
  event: IEvent;
  closeEditor: () => any;
  handleChange: (e: any) => any;
  handleDateChange: (e: any) => any;
  handleEmojiChange: (emoji: EmojiData, e: React.MouseEvent<HTMLElement>) => void;
  handleGetPhotos: () => any;
  handleAddPhoto: () => any;
  handleRemovePhoto: (sindex: number) => (e: any) => any;
  handlePhotoChange: (sindex: number, toInteger?: boolean) => (e: any) => any;
  handleSubmit: (e: any) => any;
}

export default class Editor extends React.PureComponent<IEditorProps> {
  public render() {
    const {
      event,
      closeEditor,
      handleChange,
      handleDateChange,
      handleEmojiChange,
      handleSubmit,
    } = this.props;
    return (
      <div className="editor">
        <Button className="modal-close-button pt-minimal" iconName="pt-icon-cross" onClick={closeEditor} />
        <TitleGroup text={this.getTitleText()} iconName="pt-icon-timeline-events" />
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
            minDate={moment("1900-01-01").toDate()}
            maxDate={moment("2050-01-01").toDate()}
            value={moment(event.createdAt).toDate()}
          />
        </FormGroup>
        <FormGroup
          className="emoji-picker-group"
          label="Icon"
          labelFor="icon-input"
          inline={true}
        >
          <Popover inline={true} position={Position.RIGHT}>
            <Button><Emoji emoji={event.icon} size={18} /></Button>
            <Picker title="Pick your icon" onClick={handleEmojiChange} custom={[]} />
          </Popover>
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

  private renderPhotoInputs() {
    const {
      event,
      handleGetPhotos,
      handleAddPhoto,
      handleRemovePhoto,
      handlePhotoChange,
    } = this.props;
    const photoInputs = event.photos.map((photo, index) => (
      <div className="editor-photo-input-group" key={index}>
        <input
          className="pt-input editor-photo-input src-input"
          type="text"
          name="src"
          value={photo.src}
          onChange={handlePhotoChange(index)}
        />
        <input
          className="pt-input editor-photo-input dimension-input"
          type="number"
          name="width"
          value={photo.width}
          onChange={handlePhotoChange(index, true)}
        />
        <input
          className="pt-input editor-photo-input dimension-input"
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
        <div className="editor-photo-inputs">
          {this.maybeRenderPhotoInputsHeadings()}
          {photoInputs}
        </div>
      </div>
    );
  }

  private maybeRenderPhotoInputsHeadings = () => {
    const { event } = this.props;
    if (!event.photos.length) {
      return null;
    }
    return (
      <div>
        <h6 className="editor-photo-input-heading src-heading">Source</h6>
        <h6 className="editor-photo-input-heading dimension-heading">Width</h6>
        <h6 className="editor-photo-input-heading dimension-heading">Height</h6>
      </div>
    );
  }

  private getTitleText() {
    const { mode } = this.props;
    if (mode === EditorMode.add) {
      return "Add event";
    }
    if (mode === EditorMode.edit) {
      return "Edit event";
    }
    return undefined;
  }
}
