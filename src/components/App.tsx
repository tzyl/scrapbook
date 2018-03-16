import * as React from "react";

import Modal = require("react-modal");

import Header from "../components/Header";
import ConnectedEditorModal from "../containers/EditorModal";
import ConnectedGalleryModal from "../containers/GalleryModal";
import ConnectedTimelinePage from "../containers/TimelinePage";
import { IEvent } from "../types/events";
import { IPhoto } from "../types/gallery";
import { IWorker } from "../types/worker";
import OrientationWorker from "../util/orientationWorker";
import ThumbnailWorker from "../util/thumbnailWorker";

Modal.setAppElement("#root");

export interface IStateProps {
  orientationRequests: string[];
  thumbnailRequests: string[];
  events: IEvent[];
}

export interface IDispatchProps {
  receiveOrientations: (id: string, photos: IPhoto[], startIndex: number) => any;
  finishOrientations: (id: string) => any;
  receiveThumbnails: (id: string, photos: IPhoto[], startIndex: number) => any;
  finishThumbnails: (id: string) => any;
}

export type IAppProps = IStateProps & IDispatchProps;

export interface IAppState {
  thumbnailWorker: IWorker;
  orientationWorker: IWorker;
}

export default class App extends React.PureComponent<IAppProps, IAppState> {
  public state: IAppState = {
    thumbnailWorker: null,
    orientationWorker: null,
  };

  public componentDidMount() {
    this.initializeWorker();
  }

  public componentWillReceiveProps(nextProps: IAppProps) {
    const { events, orientationRequests, thumbnailRequests } = this.props;
    if (events !== nextProps.events || thumbnailRequests !== nextProps.thumbnailRequests) {
      if (this.state.thumbnailWorker !== null) {
        this.state.thumbnailWorker.update(nextProps.events, nextProps.thumbnailRequests);
      }
    }
    if (events !== nextProps.events || orientationRequests !== nextProps.orientationRequests) {
      if (this.state.orientationWorker !== null) {
        this.state.orientationWorker.update(nextProps.events, nextProps.orientationRequests);
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
    const {
      events,
      thumbnailRequests,
      receiveThumbnails,
      finishThumbnails,
      orientationRequests,
      receiveOrientations,
      finishOrientations,
    } = this.props;

    const thumbnailWorker = new ThumbnailWorker(receiveThumbnails, finishThumbnails);
    thumbnailWorker.update(events, thumbnailRequests);
    const orientationWorker = new OrientationWorker(receiveOrientations, finishOrientations);
    orientationWorker.update(events, orientationRequests);

    this.setState({
      thumbnailWorker,
      orientationWorker,
    });
  }
}
