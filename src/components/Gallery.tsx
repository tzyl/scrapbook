import * as React from "react";

import Measure, { ContentRect, MeasuredComponentProps } from "react-measure";

import { IPhoto } from "../types/events";
import { GalleryDimensions } from "../types/gallery";
import Thumbnail from "./Thumbnail";

export interface IOwnProps {
  photos: IPhoto[];
  openLightbox: (index: number) => any;
}

export type IGalleryProps = IOwnProps;

export default class Gallery extends React.PureComponent<IGalleryProps> {
  public render() {
    return (
      <div className="gallery">
        {this.renderPhotos()}
      </div>
    );
  }

  private renderPhotos() {
    const { photos, openLightbox } = this.props;
    return photos.map((photo, index) => {
      return (
        <div key={index} className="gallery-photo-container">
          <Thumbnail
            photo={photo}
            handleClick={this.openLightboxAtIndex(index)}
          />
        </div>
      );
    });
  }

  private openLightboxAtIndex = (index: number) => () => {
    const { openLightbox } = this.props;
    openLightbox(index);
  }
}
