import * as React from "react";

import { IScrapbookPhoto } from "../types/events";
import GalleryRow from "./GalleryRow";

export interface IOwnProps {
  photos: IScrapbookPhoto[];
  width: number;
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
    const { photos, width } = this.props;
    const maxWidth = width - 50;
    const maxHeight = 150;
    let currentWidth = 0;
    const galleryRows: JSX.Element[] = [];
    let currentRow: IScrapbookPhoto[] = [];
    for (const photo of photos) {
      const scaledWidth = photo.width * maxHeight / photo.height;
      if (currentRow && currentWidth + scaledWidth > maxWidth) {
        galleryRows.push(<GalleryRow key={galleryRows.length} photos={[...currentRow]} height={maxHeight} />);
        currentWidth = 0;
        currentRow = [];
      }
      currentRow.push(photo);
      currentWidth += scaledWidth;
    }
    if (currentRow) {
      galleryRows.push(<GalleryRow photos={currentRow} height={maxHeight} />);
    }
    return galleryRows;
  }
}
