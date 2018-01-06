declare module "react-images" {
  import * as React from "react";

  export interface ILightboxProps {
    backdropClosesModal?: boolean;
    closeButtonTitle?: string;
    currentImage?: number;
    customControls?: JSX.Element[];
    images: ILightboxPhoto[];
    isOpen?: boolean;
    leftArrowTitle?: string;
    onClickImage?: (event: any) => any;
    onClickNext?: (event: any) => any;
    onClickPrev?: (event: any) => any;
    onClose: (event: any) => any;
    preloadNextImage?: boolean;
    rightArrowTitle?: string;
    showCloseButton?: boolean;
    showImageCount?: boolean;
    showThumbnails?: boolean;
    spinner?: React.SFC<ILightboxSpinnerProps>;
    spinnerColor?: string;
    spinnerSize?: number;
    theme?: object;
    thumbnailOffset?: number;
    width?: number;

  }

  export interface ILightboxPhoto {
    src: string;
    srcSet?: string[];
    caption?: JSX.Element;
    thumbnail?: string;
  }

  export interface ILightboxSpinnerProps {
    color: string;
    size: number;
  }

  export default class Lightbox extends React.Component<ILightboxProps> {}
}
