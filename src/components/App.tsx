import * as React from "react";

import ConnectedScrapbookGallery from "../containers/ScrapbookGallery";
import ConnectedScrapbookTimeline from "../containers/ScrapbookTimeline";
import { IScrapbookEvent, IScrapbookPhoto } from "../types/events";
import Header from "./Header";

const App: React.SFC<{}> = (props) => {
  return (
    <div>
      <Header title="Timeline" />
      <ConnectedScrapbookTimeline />
      <ConnectedScrapbookGallery />
    </div>
  );
};

export default App;
