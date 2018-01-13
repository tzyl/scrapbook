import * as React from "react";

import ConnectedHeader from "../containers/Header";
import ConnectedScrapbookGallery from "../containers/ScrapbookGallery";
import ConnectedScrapbookTimeline from "../containers/ScrapbookTimeline";
import { IScrapbookEvent, IScrapbookPhoto } from "../types/events";

const App: React.SFC<{}> = (props) => {
  return (
    <div>
      <ConnectedHeader />
      <ConnectedScrapbookTimeline />
      <ConnectedScrapbookGallery />
    </div>
  );
};

export default App;
