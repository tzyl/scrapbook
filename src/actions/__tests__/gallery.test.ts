import { GalleryActionDefinitions, IGalleryAction } from "../../types/gallery";
import { closeGallery,
  closeLightbox,
  openGallery,
  openLightbox,
  selectNextPhoto,
  selectPhoto,
  selectPreviousPhoto,
} from "../gallery";

describe("gallery action creators", () => {
  it("creates an open gallery action", () => {
    const expected: IGalleryAction = {
      type: GalleryActionDefinitions.OPEN_GALLERY,
    };
    expect(openGallery()).toEqual(expected);
  });

  it("creates a close gallery action", () => {
    const expected: IGalleryAction = {
      type: GalleryActionDefinitions.CLOSE_GALLERY,
    };
    expect(closeGallery()).toEqual(expected);
  });

  it("creates an open lightbox action", () => {
    const expected: IGalleryAction = {
      type: GalleryActionDefinitions.OPEN_LIGHTBOX,
    };
    expect(openLightbox()).toEqual(expected);
  });

  it("creates a close lightbox action", () => {
    const expected: IGalleryAction = {
      type: GalleryActionDefinitions.CLOSE_LIGHTBOX,
    };
    expect(closeLightbox()).toEqual(expected);
  });

  it("creates a select previous photo action", () => {
    const expected: IGalleryAction = {
      type: GalleryActionDefinitions.SELECT_PREVIOUS_PHOTO,
    };
    expect(selectPreviousPhoto()).toEqual(expected);
  });

  it("creates a select next photo action", () => {
    const expected: IGalleryAction = {
      type: GalleryActionDefinitions.SELECT_NEXT_PHOTO,
    };
    expect(selectNextPhoto()).toEqual(expected);
  });

  it("creates a select photo action", () => {
    const expected: IGalleryAction = {
      type: GalleryActionDefinitions.SELECT_PHOTO,
      payload: {
        index: 123,
      },
    };
    expect(selectPhoto(123)).toEqual(expected);
  });
});
