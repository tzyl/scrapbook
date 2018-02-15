import * as React from "react";

import { IScrapbookPhoto } from "../types/events";
import GalleryRow from "./GalleryRow";

export interface IOwnProps {
  photos: IScrapbookPhoto[];
  width: number;
  openLightbox: (index: number) => any;
}

export type IGalleryRowContainerProps = IOwnProps;

export default class GalleryRowContainer extends React.Component<IGalleryRowContainerProps> {
  public render() {
    return (
      <div className="gallery-row-container">
        {this.renderGalleryRows()}
      </div>
    );
  }

  // TODO: Pass indexes rather than copies of photos?
  private renderGalleryRows() {
    const { photos, width, openLightbox } = this.props;
    const maxWidth = width - 50;
    const maxHeight = 150;
    let currentWidth = 0;
    const galleryRows: JSX.Element[] = [];
    let currentRow: IScrapbookPhoto[] = [];
    let currentIndex = 0;
    for (const photo of photos) {
      const scaledWidth = photo.width * maxHeight / photo.height;
      if (currentRow && currentWidth + scaledWidth > maxWidth) {
        galleryRows.push(
          <GalleryRow
            key={galleryRows.length}
            photos={[...currentRow]}
            rowHeight={maxHeight + 20}
            photoHeight={maxHeight}
            startIndex={currentIndex - currentRow.length}
            openLightbox={openLightbox}
          />,
        );
        currentWidth = 0;
        currentRow = [];
      }
      currentRow.push(photo);
      currentWidth += scaledWidth;
      currentIndex++;
    }
    if (currentRow) {
      galleryRows.push(
        <GalleryRow
            key={galleryRows.length}
            photos={[...currentRow]}
            rowHeight={maxHeight + 20}
            photoHeight={maxHeight}
            startIndex={galleryRows.length}
            openLightbox={openLightbox}
        />,
      );
    }
    return galleryRows;
  }
}
