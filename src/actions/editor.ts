import { EditorActionDefinitions, EditorMode, IEditorAction } from "../types/editor";

export const openEditor = (): IEditorAction => {
  return {
    type: EditorActionDefinitions.OPEN_EDITOR,
  };
};

export const closeEditor = (): IEditorAction => {
  return {
    type: EditorActionDefinitions.CLOSE_EDITOR,
  };
};

export const setEditorMode = (mode: EditorMode): IEditorAction => {
  return {
    type: EditorActionDefinitions.SET_MODE,
    payload: {
      mode,
    },
  };
};
