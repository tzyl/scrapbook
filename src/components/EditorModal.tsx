import * as React from "react";

import { v4 } from "node-uuid";
import Modal = require("react-modal");

import { EditorMode } from "../types/editor";
import { IScrapbookEvent } from "../types/events";

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

export type IEditorModalProps = IEditorModalStateProps & IEditorModalDispatchProps;

export type IEditorModalState = IScrapbookEvent;

export default class EditorModal extends React.Component<IEditorModalProps, IEditorModalState> {
  constructor(props: IEditorModalProps) {
    super(props);
    this.state = this.createEmptyState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initializeState = this.initializeState.bind(this);
  }

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

  private handleChange(e: any) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  // TODO: Validate event
  private handleSubmit(e: any) {
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

  private initializeState() {
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
