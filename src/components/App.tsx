import * as React from "react";

import ConnectedEditorModal from "../containers/EditorModal";
import ConnectedGalleryModal from "../containers/GalleryModal";
import ConnectedHeader from "../containers/Header";
import ConnectedTimelinePage from "../containers/TimelinePage";
import { IScrapbookEvent, IScrapbookPhoto } from "../types/events";

import { remote } from "electron";
const getPhotos = remote.getGlobal("getPhotos");

const App: React.SFC<{}> = (props) => {
  return (
    <div>
      <ConnectedHeader />
      <ConnectedTimelinePage />
      <ConnectedGalleryModal />
      <ConnectedEditorModal getPhotos={getPhotos} />
    </div>
  );
};

export default App;
