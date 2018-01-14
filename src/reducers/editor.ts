import { EditorActionDefinitions, EditorMode, IStoreEditorState } from "../types/editor";
import { IAction } from "../types/redux";

const defaultState: IStoreEditorState = {
  editorIsOpen: false,
  mode: EditorMode.add,
};

const editor = (state = defaultState, action: IAction): IStoreEditorState => {
  switch (action.type) {
    case EditorActionDefinitions.OPEN_EDITOR:
      return {
        ...state,
        editorIsOpen: true,
      };
    case EditorActionDefinitions.CLOSE_EDITOR:
      return {
        ...state,
        editorIsOpen: false,
      };
    case EditorActionDefinitions.SET_MODE:
      return {
        ...state,
        mode: action.payload.mode,
      };
    default:
      return state;
  }
};

export default editor;
