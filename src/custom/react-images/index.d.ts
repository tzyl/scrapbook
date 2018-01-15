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
    onClickImage?: (e: any) => any;
    onClickNext?: (e: any) => any;
    onClickPrev?: (e: any) => any;
    onClose: (e: any) => any;
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
