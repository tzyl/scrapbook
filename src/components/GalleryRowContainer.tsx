import * as React from "react";

import Measure, { ContentRect, MeasuredComponentProps } from "react-measure";

import { IScrapbookPhoto } from "../types/events";
import GalleryRow from "./GalleryRow";

export interface IOwnProps {
  photos: IScrapbookPhoto[];
  openLightbox: (index: number) => any;
}

export type IGalleryRowContainerProps = IOwnProps;

export interface IGalleryRowContainerState {
  height: number;
  width: number;
}

export default class GalleryRowContainer extends React.Component<IGalleryRowContainerProps> {
  public state: IGalleryRowContainerState = {
    height: -1,
    width: -1,
  };

  public render() {
    return (
    <Measure
      bounds={true}
      onResize={this.handleOnResize}
    >
      {this.renderMeasuredGalleryRowContainer}
    </Measure>
    );
  }

  private renderMeasuredGalleryRowContainer: React.SFC<MeasuredComponentProps> = ({measureRef}) =>  {
    const { height } = this.state;
    return (
      <div className="gallery-row-container" ref={measureRef}>
        {this.renderGalleryRows()}
      </div>
    );
  }

  // TODO: Pass indexes rather than copies of photos?
  private renderGalleryRows() {
    const { photos, openLightbox } = this.props;
    const { width } = this.state;
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
            startIndex={currentIndex - currentRow.length}
            openLightbox={openLightbox}
        />,
      );
    }
    return galleryRows;
  }

  private handleOnResize = (contentRect: ContentRect) => {
    this.setState({
      height: contentRect.bounds.height,
      width: contentRect.bounds.width,
    });
  }
}
