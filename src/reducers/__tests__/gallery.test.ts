import { GalleryActionDefinitions, IStoreGalleryState } from "../../types/gallery";
import { IAction } from "../../types/redux";
import gallery, { defaultState } from "../gallery";

describe("gallery reducer", () => {
  let mockState: IStoreGalleryState;

  beforeEach(() => {
    mockState = {
      galleryIsOpen: false,
      lightboxIsOpen: false,
      selectedPhotoIndex: 0,
    };
  });

  it("opens gallery", () => {
    mockState.galleryIsOpen = false;
    const mockAction: IAction = {
      type: GalleryActionDefinitions.OPEN_GALLERY,
    };
    const expected: IStoreGalleryState = {
      ...mockState,
      galleryIsOpen: true,
    };
    expect(gallery(mockState, mockAction)).toEqual(expected);
  });

  it("closes gallery", () => {
    mockState.galleryIsOpen = true;
    const mockAction: IAction = {
      type: GalleryActionDefinitions.CLOSE_GALLERY,
    };
    const expected: IStoreGalleryState = {
      ...mockState,
      galleryIsOpen: false,
    };
    expect(gallery(mockState, mockAction)).toEqual(expected);
  });

  it("opens lightbox", () => {
    mockState.lightboxIsOpen = false;
    const mockAction: IAction = {
      type: GalleryActionDefinitions.OPEN_LIGHTBOX,
    };
    const expected: IStoreGalleryState = {
      ...mockState,
      lightboxIsOpen: true,
    };
    expect(gallery(mockState, mockAction)).toEqual(expected);
  });

  it("closes lightbox", () => {
    mockState.lightboxIsOpen = true;
    const mockAction: IAction = {
      type: GalleryActionDefinitions.CLOSE_LIGHTBOX,
    };
    const expected: IStoreGalleryState = {
      ...mockState,
      lightboxIsOpen: false,
    };
    expect(gallery(mockState, mockAction)).toEqual(expected);
  });

  it("selects photos", () => {
    const mockActionSelectIndex: IAction = {
      type: GalleryActionDefinitions.SELECT_PHOTO,
      payload: {
        index: 10,
      },
    };
    mockState = gallery(mockState, mockActionSelectIndex);
    expect(mockState).toEqual({
      ...mockState,
      selectedPhotoIndex: 10,
    });
    const mockActionSelectPrveious: IAction = {
      type: GalleryActionDefinitions.SELECT_PREVIOUS_PHOTO,
    };
    mockState = gallery(mockState, mockActionSelectPrveious);
    expect(mockState).toEqual({
      ...mockState,
      selectedPhotoIndex: 9,
    });
    const mockActionSelectNext: IAction = {
      type: GalleryActionDefinitions.SELECT_NEXT_PHOTO,
    };
    mockState = gallery(mockState, mockActionSelectNext);
    expect(mockState).toEqual({
      ...mockState,
      selectedPhotoIndex: 10,
    });
  });

  it("returns state for an unrecognized action", () => {
    expect(gallery(mockState, { type: null })).toBe(mockState);
  });

  it("returns default state if not initialized", () => {
    expect(gallery(undefined, { type: null })).toBe(defaultState);
  });
});
