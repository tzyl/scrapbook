import * as React from "react";

import Modal = require("react-modal");

import Header from "../components/Header";
import ConnectedEditorModal from "../containers/EditorModal";
import ConnectedGalleryModal from "../containers/GalleryModal";
import ConnectedTimelinePage from "../containers/TimelinePage";
import { IEvent, IPhoto } from "../types/events";

Modal.setAppElement("#root");

const App: React.SFC<{}> = (props) => {
  return (
    <div>
      <Header />
      <ConnectedTimelinePage />
      <ConnectedGalleryModal />
      <ConnectedEditorModal />
    </div>
  );
};

export default App;
