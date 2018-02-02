import * as React from "react";

import { Intent } from "@blueprintjs/core";
import * as moment from "moment";
import { v4 } from "node-uuid";
import Modal = require("react-modal");

import { EditorMode } from "../types/editor";
import { IScrapbookEvent, IScrapbookPhoto } from "../types/events";
import { THUMBNAIL_HEIGHT } from "../types/gallery";
import Editor from "./Editor";
import ScrapbookToaster from "./ScrapbookToaster";

// TODO: Fix ES6 import
// tslint:disable-next-line:no-var-requires
const pica = require("pica")();

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
   const { getPhotos } = this.props;
   getPhotos().then((photos) => {
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
    const { addEvent, removeEvent, mode } = this.props;
    const withThumbnails = await this.generateThumbnails(this.state);
    if (mode === EditorMode.add) {
      addEvent(withThumbnails);
      this.setState(this.createEmptyState());
      ScrapbookToaster.show({
        message: <span>Added event: <b>{withThumbnails.title}</b></span>,
        intent: Intent.SUCCESS,
      });
    } else if (mode === EditorMode.edit) {
      removeEvent(withThumbnails.id);
      addEvent(withThumbnails);
      this.setState(withThumbnails);
      ScrapbookToaster.show({
        message: <span>Edited event: <b>{withThumbnails.title}</b></span>,
        intent: Intent.SUCCESS,
      });
    }
  }

  private generateThumbnails = async (event: IScrapbookEvent): Promise<IScrapbookEvent> => {
    const newPhotos = await Promise.all(
      event.photos.map(async (photo) => this.generateThumbnail(photo, THUMBNAIL_HEIGHT)));
    const withThumbnails: IScrapbookEvent = {
      ...event,
      photos: newPhotos,
    };
    return withThumbnails;
  }

  private generateThumbnail = async (photo: IScrapbookPhoto, thumbnailHeight: number): Promise<IScrapbookPhoto> => {
    if (photo.thumbnail || photo.height < 500 || photo.width < 500) {
      return photo;
    }
    const from = await this.loadImage(photo.src);
    const to = document.createElement("canvas");
    const ratio = thumbnailHeight / photo.height;
    to.height = photo.height * ratio;
    to.width = photo.width * ratio;

    const resized: HTMLCanvasElement = await pica.resize(from, to);
    // const thumbnail = await pica.toBlob(resized, "image/jpeg");
    const thumbnail = resized.toDataURL("image/jpeg");

    const withThumbnail: IScrapbookPhoto = {
      ...photo,
      thumbnail,
    };
    return withThumbnail;
  }

  private loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.src = src;
    });
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
