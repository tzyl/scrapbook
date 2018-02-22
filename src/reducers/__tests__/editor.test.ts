import { EditorActionDefinitions, EditorMode, IStoreEditorState } from "../../types/editor";
import { IAction } from "../../types/redux";
import editor, { defaultState } from "../editor";

describe("editor reducer", () => {
  let mockState: IStoreEditorState;

  beforeEach(() => {
    mockState = {
      editorIsOpen: false,
      mode: EditorMode.add,
    };
  });

  it("sets editor mode", () => {
    mockState.mode = EditorMode.add;
    const mockAction: IAction = {
      type: EditorActionDefinitions.SET_MODE,
      payload: {
        mode: EditorMode.edit,
      },
    };
    const expected: IStoreEditorState = {
      ...mockState,
      mode: EditorMode.edit,
    };
    expect(editor(mockState, mockAction)).toEqual(expected);
  });

  it("opens editor", () => {
    mockState.editorIsOpen = false;
    const mockAction: IAction = {
      type: EditorActionDefinitions.OPEN_EDITOR,
    };
    const expected: IStoreEditorState = {
      ...mockState,
      editorIsOpen: true,
    };
    expect(editor(mockState, mockAction)).toEqual(expected);
  });

  it("closes editor", () => {
    mockState.editorIsOpen = true;
    const mockAction: IAction = {
      type: EditorActionDefinitions.CLOSE_EDITOR,
    };
    const expected: IStoreEditorState = {
      ...mockState,
      editorIsOpen: false,
    };
    expect(editor(mockState, mockAction)).toEqual(expected);
  });

  it("returns state for an unrecognized action", () => {
    expect(editor(mockState, { type: null })).toBe(mockState);
  });

  it("returns default state if not initialized", () => {
    expect(editor(undefined, { type: null })).toBe(defaultState);
  });
});
