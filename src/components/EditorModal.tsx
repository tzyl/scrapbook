import * as React from "react";

import Modal = require("react-modal");

import { EditorMode } from "../types/editor";
import { IScrapbookEvent } from "../types/events";

export interface IEditorModalStateProps {
  editorIsOpen: boolean;
  mode: EditorMode;
}

export interface IEditorModalDispatchProps {
  submitEvent: (scrapbookEvent: IScrapbookEvent) => any;
  closeEditor: (event: any) => any;
}

export type IEditorModalProps = IEditorModalStateProps & IEditorModalDispatchProps;

export type IEditorModalState = IScrapbookEvent;

export default class EditorModal extends React.Component<IEditorModalProps, IEditorModalState> {
  constructor(props: IEditorModalProps) {
    super(props);
    // TODO: Initial state?
    this.state = {
      id: "",
      title: "",
      createdAt: "",
      subtitle: "",
      description: "",
      photos: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render() {
    const { editorIsOpen, submitEvent, closeEditor } = this.props;
    return (
      <Modal
        isOpen={editorIsOpen}
        onRequestClose={closeEditor}
        shouldCloseOnEsc={false}
      >
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
          </label>
          <label>
            Date:
            <input name="createdAt" type="text" value={this.state.createdAt} onChange={this.handleChange} />
          </label>
          <label>
            Subtitle:
            <input name="subtitle" type="text" value={this.state.subtitle} onChange={this.handleChange} />
          </label>
          <label>
            Description:
            <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />
          </label>
          <button type="submit" value="Add event" />
        </form>
      </Modal>
    );
  }

  private handleChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  // TODO: Validate and submit event
  private handleSubmit(event: any) {
    return;
  }
}
