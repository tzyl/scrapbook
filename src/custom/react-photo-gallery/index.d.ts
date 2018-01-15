declare module "react-photo-gallery" {
  import * as React from "react";

  export interface IGalleryProps {
    photos: IPhotoProps[];
    columns?: number;
    onClick?: (e: any, photoObject: IPhotoObject) => any;
    margin?: number;
    ImageComponent?: JSX.Element;
  }

  export interface IPhotoProps {
    src: string;
    srcSet?: string[];
    sizes?: string[];
    width: number;
    height: number;
    alt?: string;
  }

  export interface IPhotoObject {
    index: number;
    photo: IPhotoProps;
    previous?: IPhotoProps;
    next?: IPhotoProps;
  }

  export default class Gallery extends React.Component<IGalleryProps> {}
  export class Photo extends React.PureComponent<IPhotoProps> {}
}
