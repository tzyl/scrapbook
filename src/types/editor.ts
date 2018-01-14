import { IAction } from "./redux";

export interface IStoreEditorState {
  editorIsOpen: boolean;
  mode: EditorMode;
}

export enum EditorMode {
  add = 0,
  edit = 1,
}

export enum EditorActionDefinitions {
  OPEN_EDITOR = "OPEN_EDITOR",
  CLOSE_EDITOR = "CLOSE_EDITOR",
  SET_MODE = "SET_MODE",
}

export interface IEditorAction extends IAction {
  type: EditorActionDefinitions;
}
