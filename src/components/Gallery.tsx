import * as React from "react";

import Measure, { ContentRect, MeasuredComponentProps } from "react-measure";

import { GalleryDimensions, IPhoto } from "../types/gallery";
import Thumbnail from "./Thumbnail";

export interface IGalleryProps {
  photos: IPhoto[];
  openLightbox: (index: number) => any;
}

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
        {this.renderPhotos()}
      </div>
    );
  }

  private renderPhotos() {
    const { photos, openLightbox } = this.props;
    const containerWidth = this.state.width / GalleryDimensions.COLUMNS;
    return photos.map((photo, index) => {
      return (
        <div key={index} className="gallery-photo-container">
          <Thumbnail
            photo={photo}
            handleClick={this.openLightboxAtIndex(index)}
            containerWidth={containerWidth}
          />
        </div>
      );
    });
  }

  private openLightboxAtIndex = (index: number) => () => {
    const { openLightbox } = this.props;
    openLightbox(index);
  }

  private handleOnResize = (contentRect: ContentRect) => {
    this.setState({
      width: contentRect.bounds.width,
    });
  }
}
