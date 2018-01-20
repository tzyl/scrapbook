import * as React from "react";

import { v4 } from "node-uuid";
import Modal = require("react-modal");

import { EditorMode } from "../types/editor";
import { IScrapbookEvent, IScrapbookPhoto } from "../types/events";
import Button from "./Button";

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

  public render() {
    const { editorIsOpen, mode, closeEditor } = this.props;
    return (
      <Modal
        isOpen={editorIsOpen}
        onAfterOpen={this.initializeState}
        onRequestClose={closeEditor}
        shouldCloseOnEsc={false}
      >
        {mode === EditorMode.add && <h2>Add event</h2>}
        {mode === EditorMode.edit && <h2>Edit event</h2>}
        <form onSubmit={this.handleSubmit}>
          <label>
            <h3>Title:</h3>
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
          </label>
          <label>
            <h3>Date (yyyy-MM-dd):</h3>
            <input name="createdAt" type="text" value={this.state.createdAt} onChange={this.handleChange} />
          </label>
          <label>
            <h3>Subtitle:</h3>
            <input name="subtitle" type="text" value={this.state.subtitle} onChange={this.handleChange} />
          </label>
          <label>
            <h3>Description:</h3>
            <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />
          </label>
          <div>
            <h3>Photos:</h3>
            {this.renderPhotoInputs()}
          </div>
          <div>
            <Button type="button" onClick={this.handleGetPhotos}>Add from folder</Button>
          </div>
          <Button type="submit">Submit event</Button>
        </form>
      </Modal>
    );
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
        <Button type="button" onClick={this.handleRemovePhoto(index)}>-</Button>
      </div>
    ));
    return (
      <div>
        <Button type="button" onClick={this.handleAddPhoto}>Add Photo</Button>
        {photoInputs}
      </div>
    );
  }

  private handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
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
      createdAt: "",
      subtitle: "",
      description: "",
      photos: [],
    };
  }
}
