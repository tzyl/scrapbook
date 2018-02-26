import * as React from "react";

import Modal = require("react-modal");

import Header from "../components/Header";
import ConnectedEditorModal from "../containers/EditorModal";
import ConnectedGalleryModal from "../containers/GalleryModal";
import ConnectedTimelinePage from "../containers/TimelinePage";
import { IWorker } from "../types/worker";
import ThumbnailWorker from "../util/thumbnailWorker";

Modal.setAppElement("#root");

export interface IDispatchProps {
  workerRequests: string[];
}

export type IAppProps = IDispatchProps;

export interface IAppState {
  worker: IWorker;
}

export default class App extends React.Component<IAppProps, IAppState> {
  public state: IAppState = {
    worker: null,
  };

  public componentDidMount() {
    this.initializeWorker();
  }

  public render() {
    return (
      <div>
        <Header />
        <ConnectedTimelinePage />
        <ConnectedGalleryModal />
        <ConnectedEditorModal />
      </div>
    );
  }

  private initializeWorker = () => {
    const thumbnailWorker = new ThumbnailWorker();
  }
}
