import * as React from "react";

import { Button, FormGroup, Popover, Position, TextArea } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Emoji, Picker, EmojiData } from "emoji-mart";
import * as moment from "moment";

import { EditorMode } from "../types/editor";
import { IScrapbookEvent } from "../types/events";
import TitleGroup from "./TitleGroup";

export interface IOwnProps {
  mode: EditorMode;
  event: IScrapbookEvent;
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

export type IEditorProps = IOwnProps;

export default class Editor extends React.Component<IEditorProps> {
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
            <Picker onClick={handleEmojiChange} custom={[]} />
          </Popover>
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
