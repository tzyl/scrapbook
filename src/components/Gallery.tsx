import * as React from "react";

import { Button } from "@blueprintjs/core";
import Measure, { ContentRect, MeasuredComponentProps } from "react-measure";
import { IPhotoObject } from "react-photo-gallery";
import ReactPhotoGallery from "react-photo-gallery";

import { IScrapbookEvent } from "../types/events";
import GalleryRowContainer from "./GalleryRowContainer";
import Thumbnail from "./Thumbnail";
import TitleGroup from "./TitleGroup";

export interface IOwnProps {
  event: IScrapbookEvent;
  openLightbox: (index: number) => any;
  closeGallery: () => any;
}

export type IGalleryProps = IOwnProps;

export interface IGalleryState {
  width: number;
}

export default class Gallery extends React.Component<IGalleryProps, IGalleryState> {
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

  private renderMeasuredGallery: React.SFC<MeasuredComponentProps> = ({measureRef}) => {
    const { event, openLightbox, closeGallery } = this.props;
    const { width } = this.state;
    return (
      <div className="gallery" ref={measureRef}>
        <Button className="modal-close-button pt-minimal" iconName="pt-icon-cross" onClick={closeGallery} />
        <TitleGroup text={event.title} iconName="pt-icon-media" />
        <GalleryRowContainer photos={event.photos} width={width} openLightbox={openLightbox} />
      </div>
    );
  }

  private handleOnResize = (contentRect: ContentRect) => {
    this.setState({width: contentRect.bounds.width});
  }
}
