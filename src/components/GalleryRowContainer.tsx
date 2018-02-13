import * as React from "react";

import { IScrapbookPhoto } from "../types/events";

export interface IOwnProps {
  photos: IScrapbookPhoto[];
  width: number;
}

export type IGalleryRowContainerProps = IOwnProps;

export default class GalleryRowContainer extends React.Component<IGalleryRowContainerProps> {
  public render() {
    return (
      <span>Placeholder</span>
    );
  }
}
