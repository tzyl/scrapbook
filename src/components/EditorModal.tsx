import * as React from "react";

import { Intent } from "@blueprintjs/core";
import * as moment from "moment";
import { v4 } from "node-uuid";
import Modal = require("react-modal");

import { EditorMode } from "../types/editor";
import { IScrapbookEvent, IScrapbookPhoto } from "../types/events";
import { getPhotos } from "../util/electron";
import toaster from "../util/toaster";
import Editor from "./Editor";

export interface IEditorModalStateProps {
  editorIsOpen: boolean;
  mode: EditorMode;
  selectedEvent: IScrapbookEvent;
}

export interface IEditorModalDispatchProps {
  addEvent: (scrapbookEvent: IScrapbookEvent) => any;
  removeEvent: (id: string) => any;
  closeEditor: () => any;
  requestThumbnails: (id: string, photos: IScrapbookPhoto[]) => any;
}

export type IEditorModalProps = & IEditorModalStateProps & IEditorModalDispatchProps;

export type IEditorModalState = IScrapbookEvent;

export default class EditorModal extends React.Component<IEditorModalProps, IEditorModalState> {
  public state: IEditorModalState = this.createEmptyState();

  public render() {
    const { editorIsOpen, closeEditor, mode } = this.props;
    const modalStyles = {overlay: {zIndex: 10}};
    return (
      <Modal
        isOpen={editorIsOpen}
        onAfterOpen={this.initializeState}
        onRequestClose={closeEditor}
        shouldCloseOnEsc={false}
        style={modalStyles}
      >
        <Editor
          mode={mode}
          event={this.state}
          closeEditor={closeEditor}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          handleGetPhotos={this.handleGetPhotos}
          handleAddPhoto={this.handleAddPhoto}
          handleRemovePhoto={this.handleRemovePhoto}
          handlePhotoChange={this.handlePhotoChange}
          handleSubmit={this.handleSubmit}
        />
      </Modal>
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
   getPhotos().then((photos: IScrapbookPhoto[]) => {
    this.setState({
      photos: this.state.photos.concat(photos),
    });
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

  // TODO: Validate event
  private handleSubmit = async (e: any) => {
    e.preventDefault();
    const { addEvent, removeEvent, requestThumbnails, mode } = this.props;
    requestThumbnails(this.state.id, this.state.photos);
    if (mode === EditorMode.add) {
      addEvent(this.state);
      this.setState(this.createEmptyState());
      toaster.show({
        message: <span>Added event: <b>{this.state.title}</b></span>,
        intent: Intent.SUCCESS,
      });
    } else if (mode === EditorMode.edit) {
      removeEvent(this.state.id);
      addEvent(this.state);
      toaster.show({
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
