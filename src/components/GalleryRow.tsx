import * as React from "react";

import { IScrapbookPhoto } from "../types/events";

export interface IOwnProps {
  photos: IScrapbookPhoto[];
  height: number;
}

export type IGalleryRowProps = IOwnProps;

const GalleryRow: React.SFC<IGalleryRowProps> = (props) => {
  return (
    <span>Placeholder</span>
  );
};

export default GalleryRow;
