import * as React from "react";

import Measure, { ContentRect, MeasuredComponentProps } from "react-measure";

import { IPhoto } from "../types/events";
import { GalleryDimensions } from "../types/gallery";
import GalleryRow from "./GalleryRow";

export interface IOwnProps {
  photos: IPhoto[];
  openLightbox: (index: number) => any;
}

export type IGalleryProps = IOwnProps;

export interface IGalleryState {
  width: number;
}

export default class Gallery extends React.PureComponent<IGalleryProps> {
  public state: IGalleryState = {
    width: -1,
  };

  public render() {
    return (
    <Measure
      bounds={true}
      onResize={this.handleOnResize}
    >
      {this.renderMeasuredGallery}
    </Measure>
    );
  }

  private renderMeasuredGallery: React.SFC<MeasuredComponentProps> = ({measureRef}) =>  {
    return (
      <div className="gallery" ref={measureRef}>
        {this.renderGalleryRows()}
      </div>
    );
  }

  private renderGalleryRows() {
    const { photos, openLightbox } = this.props;
    const { width } = this.state;
    const maxWidth = width - GalleryDimensions.ROW_RESERVED_HORIZONTAL_SPACE;
    let currentWidth = 0;
    const galleryRows: JSX.Element[] = [];
    let currentRow: IPhoto[] = [];
    let currentIndex = 0;
    for (const photo of photos) {
      const scaledWidth = photo.width * GalleryDimensions.THUMBNAIL_HEIGHT / photo.height;
      if (currentRow.length && currentWidth + scaledWidth > maxWidth) {
        galleryRows.push(
          <GalleryRow
            key={galleryRows.length}
            photos={photos}
            startIndex={currentIndex - currentRow.length}
            length={currentRow.length}
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
    if (currentRow.length) {
      galleryRows.push(
        <GalleryRow
            key={galleryRows.length}
            photos={photos}
            startIndex={currentIndex - currentRow.length}
            length={currentRow.length}
            openLightbox={openLightbox}
        />,
      );
    }
    return galleryRows;
  }

  private handleOnResize = (contentRect: ContentRect) => {
    this.setState({
      width: contentRect.bounds.width,
    });
  }
}
