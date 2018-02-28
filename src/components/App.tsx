import * as React from "react";

import Modal = require("react-modal");

import Header from "../components/Header";
import ConnectedEditorModal from "../containers/EditorModal";
import ConnectedGalleryModal from "../containers/GalleryModal";
import ConnectedTimelinePage from "../containers/TimelinePage";
import { IEvent, IPhoto } from "../types/events";
import { IWorker } from "../types/worker";
import ThumbnailWorker from "../util/thumbnailWorker";

Modal.setAppElement("#root");

export interface IStateProps {
  requests: string[];
  events: IEvent[];
}

export interface IDispatchProps {
  receiveThumbnails: (id: string, photos: IPhoto[], startIndex: number) => any;
  finishThumbnails: (id: string) => any;
}

export type IAppProps = IStateProps & IDispatchProps;

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

  public componentWillReceiveProps(nextProps: IAppProps) {
    const { events, requests } = this.props;
    if (this.state.worker !== null) {
      if (events !== nextProps.events || requests !== nextProps.requests) {
        this.state.worker.update(nextProps.events, nextProps.requests);
      }
    }
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
    const { events, requests, receiveThumbnails, finishThumbnails } = this.props;
    const thumbnailWorker = new ThumbnailWorker(receiveThumbnails, finishThumbnails);
    thumbnailWorker.update(events, requests);
    this.setState({
      worker: thumbnailWorker,
    });
  }
}
