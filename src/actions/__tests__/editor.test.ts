import { EditorActionDefinitions, EditorMode, IEditorAction } from "../../types/editor";
import { closeEditor, openEditor, setEditorMode } from "../editor";

describe("editor action creators", () => {
  it("creates an open editor action", () => {
    const expected: IEditorAction = {
      type: EditorActionDefinitions.OPEN_EDITOR,
    };
    expect(openEditor()).toEqual(expected);
  });

  it("creates a close editor action", () => {
    const expected: IEditorAction = {
      type: EditorActionDefinitions.CLOSE_EDITOR,
    };
    expect(closeEditor()).toEqual(expected);
  });

  it("creates a set editor mode action", () => {
    const expected: IEditorAction = {
      type: EditorActionDefinitions.SET_MODE,
      payload: {
        mode: EditorMode.edit,
      },
    };
    expect(setEditorMode(EditorMode.edit)).toEqual(expected);
  });
});
