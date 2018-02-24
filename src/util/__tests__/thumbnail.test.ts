import { mockEvents } from "../../mockData";
import { IPhoto } from "../../types/events";
import generateThumbnails from "../thumbnail";

const mockPhotoWithoutThumbnail: IPhoto = {
  src: "src",
  height: 500,
  width: 500,
};

const mockPhotoWithThumbnail: IPhoto = {
  src: "src",
  height: 500,
  width: 500,
  thumbnail: "thumbnail",
};

const mockPhotoSmallHeight: IPhoto = {
  src: "src",
  height: 1,
  width: 500,
};

const mockPhotoSmallWidth: IPhoto = {
  src: "src",
  height: 500,
  width: 1,
};

describe("thumbnail generator", () => {
  it("generates thumbnails when height and width >= 500", async () => {
    const mockPhotosWithoutThumbnails: IPhoto[] = [
      {
        ...mockPhotoWithoutThumbnail,
      },
    ];
    const mockPhotosWithThumbnails: IPhoto[] = [
      {
        ...mockPhotoWithThumbnail,
      },
    ];
    // TODO: Fix structure to mock this
    // expect(await generateThumbnails(mockPhotosWithoutThumbnails)).toEqual(mockPhotosWithThumbnails);
  });

  it("uses src for thumbnail if width or height < 500", async () => {
    const mockPhotosSmallHeight: IPhoto[] = [
      {
        ...mockPhotoSmallHeight,
      },
    ];
    expect(await generateThumbnails(mockPhotosSmallHeight)).toEqual([
      {
        ...mockPhotoSmallHeight,
        thumbnail: mockPhotoSmallHeight.src,
      },
    ]);
    const mockPhotosSmallWidth: IPhoto[] = [
      {
        ...mockPhotoSmallWidth,
      },
    ];
    expect(await generateThumbnails(mockPhotosSmallWidth)).toEqual([
      {
        ...mockPhotoSmallWidth,
        thumbnail: mockPhotoSmallWidth.src,
      },
    ]);
  });

  it("uses existing thumbnail if present", async () => {
    const mockPhotosWithThumbnails: IPhoto[] = [
      {
        ...mockPhotoWithThumbnail,
      },
    ];
    expect(await generateThumbnails(mockPhotosWithThumbnails)).toEqual(mockPhotosWithThumbnails);
  });
});
