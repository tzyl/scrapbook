import * as React from "react";

import { Button, Tag, TextArea } from "@blueprintjs/core";
import { DatePicker } from "@blueprintjs/datetime";
import * as moment from "moment";
import { v4 } from "node-uuid";
import Modal = require("react-modal");

import { EditorMode } from "../types/editor";
import { IScrapbookEvent, IScrapbookPhoto } from "../types/events";

export interface IEditorModalStateProps {
  editorIsOpen: boolean;
  mode: EditorMode;
  selectedEvent: IScrapbookEvent;
}

export interface IEditorModalDispatchProps {
  addEvent: (scrapbookEvent: IScrapbookEvent) => any;
  removeEvent: (id: string) => any;
  closeEditor: () => any;
}

export interface IEditorModalOwnProps {
  getPhotos: () => Promise<IScrapbookPhoto[]>;
}

export type IEditorModalProps = IEditorModalOwnProps & IEditorModalStateProps & IEditorModalDispatchProps;

export type IEditorModalState = IScrapbookEvent;

export default class EditorModal extends React.Component<IEditorModalProps, IEditorModalState> {
  public state: IEditorModalState = this.createEmptyState();

  // TODO: Use Label component after fix (https://github.com/palantir/blueprint/issues/1971)
  public render() {
    const { editorIsOpen, closeEditor } = this.props;
    return (
      <Modal
        isOpen={editorIsOpen}
        onAfterOpen={this.initializeState}
        onRequestClose={closeEditor}
        shouldCloseOnEsc={false}
      >
        {this.renderTitle()}
        <form onSubmit={this.handleSubmit}>
          <label className="pt-label">
            Title
            <input
              className="pt-input"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <label className="pt-label">
            Date
            <Tag>{this.state.createdAt}</Tag>
          </label>
          <div style={{display: "flex"}}>
            <DatePicker
              className="pt-elevation-1"
              canClearSelection={false}
              onChange={this.handleDateChange}
              value={moment(this.state.createdAt).toDate()}
            />
          </div>
          <label className="pt-label">
            Subtitle
            <input
              className="pt-input"
              name="subtitle"
              type="text"
              value={this.state.subtitle}
              onChange={this.handleChange}
            />
          </label>
          <label className="pt-label">
            Description
            <TextArea
              name="description"
              fill={true}
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <div>
            <h3>Photos</h3>
            {this.renderPhotoInputs()}
          </div>
          <Button type="submit">Submit event</Button>
        </form>
      </Modal>
    );
  }

  private renderTitle() {
    const { mode } = this.props;
    if (mode === EditorMode.add) {
      return <h2>Add event</h2>;
    }
    if (mode === EditorMode.edit) {
      return <h2>Edit event</h2>;
    }
  }

  private renderPhotoInputs() {
    const photoInputs = this.state.photos.map((photo, index) => (
      <div key={index}>
        <input
          type="text"
          name="src"
          value={photo.src}
          onChange={this.handlePhotoChange(index)}
        />
        <input
          type="number"
          name="width"
          value={photo.width}
          onChange={this.handlePhotoChange(index, true)}
        />
        <input
          type="number"
          name="height"
          value={photo.height}
          onChange={this.handlePhotoChange(index, true)}
        />
        <Button iconName="pt-icon-remove" onClick={this.handleRemovePhoto(index)} />
      </div>
    ));
    return (
      <div>
        <Button onClick={this.handleAddPhoto}>Add Photo</Button>
        <Button onClick={this.handleGetPhotos}>Add from folder</Button>
        {photoInputs}
      </div>
    );
  }

  private handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  private handleDateChange = (selectedDate: Date, hasUserManuallySelectedDate: boolean) => {
    this.setState({
      createdAt: moment(selectedDate).format("YYYY-MM-DD"),
    });
  }

  private handleGetPhotos = () => {
   const { getPhotos } = this.props;
   getPhotos().then((photos) => {
    this.setState({
      photos: this.state.photos.concat(photos),
    });
   });
  }

  private handlePhotoChange = (sindex: number, toInteger: boolean = false) => (e: any) => {
    const newPhotos = this.state.photos.map((photo, index) => {
      if (index !== sindex) { return photo; }
      return {
        ...photo,
        [e.target.name]: toInteger ? parseInt(e.target.value, 10) : e.target.value,
      };
    });
    this.setState({
      photos: newPhotos,
    });
  }

  private handleAddPhoto = () => {
    const newPhoto = {
      src: "",
      width: 1,
      height: 1,
    };
    this.setState({
      photos: this.state.photos.concat([newPhoto]),
    });
  }

  private handleRemovePhoto = (sindex: number) => (e: any) => {
    this.setState({
      photos: this.state.photos.filter((photo, index) => index !== sindex),
    });
  }

  // TODO: Validate event + notification on add/edit.
  private handleSubmit = (e: any) => {
    e.preventDefault();
    const { addEvent, removeEvent, mode } = this.props;
    if (mode === EditorMode.add) {
      addEvent(this.state);
      this.setState(this.createEmptyState());
    } else if (mode === EditorMode.edit) {
      removeEvent(this.state.id);
      addEvent(this.state);
    }
  }

  private initializeState = () => {
    const { mode, selectedEvent } = this.props;
    if (mode === EditorMode.add) {
      this.setState(this.createEmptyState());
    } else if (mode === EditorMode.edit) {
      this.setState(selectedEvent);
    }
  }

  private createEmptyState(): IEditorModalState {
    return {
      id: v4(),
      title: "",
      createdAt: moment().format("YYYY-MM-DD"),
      subtitle: "",
      description: "",
      photos: [],
    };
  }
}
