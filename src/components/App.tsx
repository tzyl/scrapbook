import * as React from "react";

import Header from "../components/Header";
import ConnectedEditorModal from "../containers/EditorModal";
import ConnectedGalleryModal from "../containers/GalleryModal";
import ConnectedTimelinePage from "../containers/TimelinePage";
import { IScrapbookEvent, IScrapbookPhoto } from "../types/events";

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
