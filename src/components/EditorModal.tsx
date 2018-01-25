import * as React from "react";

import { Button, FormGroup, Intent, TextArea } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import * as moment from "moment";
import { v4 } from "node-uuid";
import Modal = require("react-modal");

import { EditorMode } from "../types/editor";
import { IScrapbookEvent, IScrapbookPhoto } from "../types/events";
import ScrapbookToaster from "./ScrapbookToaster";

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
    const modalStyles = {overlay: {zIndex: 10}};
    return (
      <Modal
        isOpen={editorIsOpen}
        onAfterOpen={this.initializeState}
        onRequestClose={closeEditor}
        shouldCloseOnEsc={false}
        style={modalStyles}
      >
        {this.renderTitle()}
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
            value={this.state.title}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup
          label="Date"
          requiredLabel={true}
        >
          <DateInput
            canClearSelection={false}
            format="YYYY-MM-DD"
            onChange={this.handleDateChange}
            value={moment(this.state.createdAt).toDate()}
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
            value={this.state.subtitle}
            onChange={this.handleChange}
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
            value={this.state.description}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup
          label="Photos"
        >
          {this.renderPhotoInputs()}
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit event</Button>
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

  private handleDateChange = (selectedDate: Date) => {
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

  // TODO: Validate event
  private handleSubmit = (e: any) => {
    e.preventDefault();
    const { addEvent, removeEvent, mode } = this.props;
    if (mode === EditorMode.add) {
      addEvent(this.state);
      this.setState(this.createEmptyState());
      ScrapbookToaster.show({
        message: <span>Added event: <b>{this.state.title}</b></span>,
        intent: Intent.SUCCESS,
      });
    } else if (mode === EditorMode.edit) {
      removeEvent(this.state.id);
      addEvent(this.state);
      ScrapbookToaster.show({
        message: <span>Edited event: <b>{this.state.title}</b></span>,
        intent: Intent.SUCCESS,
      });
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
