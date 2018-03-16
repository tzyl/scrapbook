import * as React from "react";

import { Intent } from "@blueprintjs/core";
import { EmojiData } from "emoji-mart";
import * as moment from "moment";
import { v4 } from "node-uuid";
import Modal = require("react-modal");

import { EditorMode } from "../types/editor";
import { IEvent } from "../types/events";
import { IPhoto } from "../types/gallery";
import { getPhotos } from "../util/electron";
import toaster from "../util/toaster";
import Editor from "./Editor";

export interface IStateProps {
  editorIsOpen: boolean;
  mode: EditorMode;
  selectedEvent: IEvent;
}

export interface IDispatchProps {
  addEvent: (event: IEvent) => any;
  removeEvent: (id: string) => any;
  closeEditor: () => any;
  requestThumbnails: (id: string) => any;
  requestOrientations: (id: string) => any;
}

export type IEditorModalProps = & IStateProps & IDispatchProps;

export type IEditorModalState = IEvent;

export default class EditorModal extends React.PureComponent<IEditorModalProps, IEditorModalState> {
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
          handleEmojiChange={this.handleEmojiChange}
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

  private handleEmojiChange = (emoji: EmojiData, e: React.MouseEvent<HTMLElement>): void => {
    this.setState({
      icon: emoji.colons,
    });
  }

  private handleGetPhotos = () => {
   getPhotos().then((photos: IPhoto[]) => {
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
    const { addEvent, removeEvent, requestThumbnails, requestOrientations, mode } = this.props;
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
    requestThumbnails(this.state.id);
    requestOrientations(this.state.id);
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
      icon: ":rocket:",
      description: "",
      photos: [],
    };
  }
}
