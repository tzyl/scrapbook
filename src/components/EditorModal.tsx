import * as React from "react";

import { v4 } from "node-uuid";
import Modal = require("react-modal");

import { EditorMode } from "../types/editor";
import { IScrapbookEvent } from "../types/events";

export interface IEditorModalStateProps {
  editorIsOpen: boolean;
  mode: EditorMode;
}

export interface IEditorModalDispatchProps {
  addEvent: (scrapbookEvent: IScrapbookEvent) => any;
  removeEvent: (id: string) => any;
  closeEditor: (event: any) => any;
}

export type IEditorModalProps = IEditorModalStateProps & IEditorModalDispatchProps;

export type IEditorModalState = IScrapbookEvent;

export default class EditorModal extends React.Component<IEditorModalProps, IEditorModalState> {
  constructor(props: IEditorModalProps) {
    super(props);
    this.state = this.createEmptyState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  public render() {
    const { editorIsOpen, mode } = this.props;
    return (
      <Modal
        isOpen={editorIsOpen}
        onRequestClose={this.handleClose}
        shouldCloseOnEsc={false}
      >
        {mode === EditorMode.add && <h2>Add event</h2>}
        {mode === EditorMode.edit && <h2>Edit event</h2>}
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
          </label>
          <label>
            Date (yyyy-MM-dd):
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
          <button type="submit">Submit event</button>
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

  // TODO: Validate event
  private handleSubmit(event: any) {
    const { addEvent, removeEvent, mode } = this.props;
    if (mode === EditorMode.edit) {
      removeEvent(this.state.id);
    }
    addEvent(this.state);
    event.preventDefault();
  }

  private handleClose(event: any) {
    const { closeEditor } = this.props;
    this.setState(this.createEmptyState());
    closeEditor(event);
  }

  private createEmptyState(): IEditorModalState {
    return {
      id: v4(),
      title: "",
      createdAt: "",
      subtitle: undefined,
      description: undefined,
      photos: [],
    };
  }
}
